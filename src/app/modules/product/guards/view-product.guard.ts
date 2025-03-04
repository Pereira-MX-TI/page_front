import { CanActivateFn } from '@angular/router';

export const viewProductGuard: CanActivateFn = (route) => {
  const { data } = route.params;
  if (!data) return false;

  return true;
};
