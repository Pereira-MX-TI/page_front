import { CanActivateFn } from '@angular/router';

export const viewProductGuard: CanActivateFn = (route, state) => {
  const { data } = route.queryParams;
  if (!data) return false;

  return true;
};
