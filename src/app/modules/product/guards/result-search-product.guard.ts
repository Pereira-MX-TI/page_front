import { CanActivateFn } from '@angular/router';

export const resultSearchProductGuard: CanActivateFn = (route, state) => {
  const { data: queryParams } = route.queryParams;
  const { data: params } = route.params;

  if (!params && !queryParams) return false;

  return true;
};
