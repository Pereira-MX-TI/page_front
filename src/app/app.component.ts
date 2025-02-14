import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { Platform } from '@angular/cdk/platform';
import { Subscription } from 'rxjs';
import { LocalStorageService } from './services/local-storage.service';
import { ShareInformationService } from './services/share-information.service';
import { SelectOptionNavObservable } from './observables/select_option_nav.observable';
import { HttpService } from './services/http.service';
import { checkOptionCurrentNav } from './functions/check_option_current_nav.function';
import { MaterialComponents } from './modules/material/material.module';
import { HeadNavComponent } from './modules/nav-bar/components/head-nav/head-nav.component';
import { MovilNavComponent } from './modules/nav-bar/components/movil-nav/movil-nav.component';
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeadNavComponent,
    MovilNavComponent,
    MaterialComponents,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('sideNav', { static: true }) sideNav: any;

  title = 'Medidores para agua';
  listSubscription: Subscription[] = [new Subscription()];
  sideNavStatus: boolean = false;
  currentYear: number = new Date().getFullYear();

  constructor(
    private readonly _platform: Platform,
    private readonly router: Router,
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private shareInformationService: ShareInformationService,
    private selectOptionNavObservable: SelectOptionNavObservable,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    // this.navigationService.navigatePage('mantenimiento');

    if (this._platform.isBrowser) {
      if (environment.production) {
        // this.googleTagManagerService.addGtmToDom();
        // this.googleTagManager();
      }
    }

    this.subscriptionPositionScroll();
    this.subscriptionSideNav();
    this.subscribeNavigation();
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  private subscriptionPositionScroll() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  private googleTagManager() {
    this.router.events.forEach((item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url,
        };

        // this.googleTagManagerService.pushTag(gtmTag);
      }
    });
  }

  private subscriptionSideNav(): void {
    this.listSubscription[0] = this.shareInformationService.sideNav$.subscribe(
      () => (this.sideNavStatus = !this.sideNavStatus)
    );
  }

  private subscribeNavigation(): void {
    this.listSubscription[1] = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectOptionNavObservable.updateData(
          checkOptionCurrentNav(this.router.url)
        );
      }
    });
  }

  private getIpAddress(): void {
    this.httpService.getIpAddress().subscribe(
      (res) => {
        this.localStorageService.save('adip', res);
      },
      (err) => {}
    );
  }

  openPdfPrivacy(): void {
    window.open('./../../../../../assets/privacidad.pdf', '_blank');
  }
}
