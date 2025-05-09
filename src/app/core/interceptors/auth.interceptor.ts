import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/spinner/spinner.service';
import { AuthService } from '../services/auth/auth.service';
import { catchError, switchMap, throwError, finalize } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(SpinnerService);
  const auth = inject(AuthService);
  const router = inject(Router);
  spinner.show();
  let token = auth.getToken();
  const newReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}) 
    }
  });

  return next(newReq).pipe(
    catchError((error) => {
      debugger
      if (error.status === 401) {
        return auth.refreshToken().pipe(
          switchMap((newAccesstoken) => {
            if(newAccesstoken)
            {
              const newToken = newAccesstoken;
              const retriedReq = req.clone({
                setHeaders: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next(retriedReq);
            }
            else
            {
              router.navigateByUrl("auth/login")
              return throwError(() => new Error("Refreshtoken failed."));
            }
          }),
          catchError((refreshError) => {
            auth.logOut();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    }),
    finalize(() => spinner.hide())
  );
};
