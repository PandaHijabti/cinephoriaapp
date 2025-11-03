import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const canActivateAuth: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.refresh(); // check cookie
  if (auth.isLoggedIn()) return true;
  router.navigate(['/login']);
  return false;
};