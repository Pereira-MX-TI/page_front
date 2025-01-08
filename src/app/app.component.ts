import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { HttpService } from './services/http.service';
import { LocalStorageService } from './services/local-storage.service';
import { ShareInformationService } from './services/share-information.service';

import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { checkOptionCurrentNav } from './functions/check_option_current_nav.function';
import { SelectOptionNavObservable } from './observables/select_option_nav.observable';

declare let gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sideNav', { static: true }) sideNav: any;

  sideNavStatus: boolean = false;
  listSubscription: Subscription[];
  currentYear: number = new Date().getFullYear();

  constructor(
    private router: Router,
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private shareInformationService: ShareInformationService,
    private selectOptionNavObservable: SelectOptionNavObservable
  ) {
    this.listSubscription = [new Subscription()];
  }

  ngOnInit(): void {
    // this.getIpAddress();

    this.subscriptionSideNav();
    this.subscribeNavigation();
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  ngAfterViewInit(): void {}

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
