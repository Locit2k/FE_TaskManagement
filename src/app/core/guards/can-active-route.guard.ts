import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CommonService } from '../services/common/common.service';

export const canActiveRouteGuard: CanActivateFn = (route, state) => {
  debugger
  const authSV = inject(AuthService);
  const commonSV = inject(CommonService);
  let token = authSV.getToken();
  if(token)
  {
    return true;
  }
  else
  {
    commonSV.navigateUrl("auth/login");
    return false;
  }
};
