import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigatePage(urlCurrent: string): void {
    this.router.navigate([urlCurrent]);
  }
}
