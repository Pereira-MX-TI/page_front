import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import {
  LocalStorageService,
  NavegationService,
  ShareInformationService,
} from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class CheckReloadService {
  constructor(
    private objRouter: Router,
    public objNavegationService: NavegationService,
    private objLocalStorageService: LocalStorageService,
    public objShareInformationService: ShareInformationService,
  ) {}

  check(): void {
    this.objRouter.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          this.clearVarPage(this.objRouter.url);
        }
      });
  }

  clearVarPage(url: string): void {
    switch (url) {
      case '/Product/List':
        {
          this.objLocalStorageService.remove(['cwlpro']);
        }
        break;
    }
  }
}
