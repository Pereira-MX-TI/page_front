import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigatePage(urlCurrent: string, params?: any): void {
    if (!params) {
      this.router.navigateByUrl(urlCurrent);
      return;
    }
    this.router.navigate([urlCurrent], { queryParams: { ...params } });
  }
}
