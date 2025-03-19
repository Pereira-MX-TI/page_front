import { CanActivateFn } from '@angular/router';

export const viewProductGuard: CanActivateFn = (route) => {
  const { data: params } = route.params;
  const { data: queryParams } = route.queryParams;

  if (!params && !queryParams) return false;

  return true;
};
