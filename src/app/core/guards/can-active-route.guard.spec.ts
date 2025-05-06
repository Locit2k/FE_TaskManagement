import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canActiveRouteGuard } from './can-active-route.guard';

describe('canActiveRouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canActiveRouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
