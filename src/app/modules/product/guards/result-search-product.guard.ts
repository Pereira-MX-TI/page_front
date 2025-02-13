import { CanActivateFn } from '@angular/router';

export const resultSearchProductGuard: CanActivateFn = (route, state) => {
  const { data } = route.queryParams;
  if (!data) return false;

  return true;
};
