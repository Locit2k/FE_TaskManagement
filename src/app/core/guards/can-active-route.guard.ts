import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const canActiveRouteGuard: CanActivateFn = (route, state) => {
  const authSV = inject(AuthService);
  const router = inject(Router);
  let token = authSV.getToken();
  if(token)
  {
    return true;
  }
  else
  {
    router.navigate(["auth/login"]);
    return false;
  }
};
