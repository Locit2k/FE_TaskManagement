import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';

export const canActiveRouteGuard: CanActivateFn = (route, state) => {
  const authSV = inject(AuthService);
  const router = inject(Router);
  return authSV.getUser().pipe(map((res) => {
    if(res)
    {
      return true;
    }
    else
    {
      router.navigate(["auth/login"]);
      return false;
    }
  }))
};
