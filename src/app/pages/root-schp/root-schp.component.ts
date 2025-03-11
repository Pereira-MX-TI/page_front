import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeadNavComponent } from '../../modules/nav-bar/components/head-nav/head-nav.component';
import { MovilNavComponent } from '../../modules/nav-bar/components/movil-nav/movil-nav.component';
import { MaterialComponents } from '../../modules/material/material.module';
import { Subscription } from 'rxjs';
import { ShareInformationService } from '../../services/share-information.service';
import { SelectOptionNavObservable } from '../../observables/select_option_nav.observable';
import { checkOptionCurrentNav } from '../../functions/check_option_current_nav.function';

@Component({
  selector: 'app-root-schp',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeadNavComponent,
    MovilNavComponent,
    MaterialComponents,
  ],
  templateUrl: './root-schp.component.html',
  styleUrl: './root-schp.component.css',
})
export class RootSchpComponent {
  @ViewChild('sideNav', { static: true }) sideNav: any;

  title = 'Venta de medidores de agua - Schp';
  listSubscription: Subscription[] = [new Subscription()];
  sideNavStatus: boolean = false;
  currentYear: number = new Date().getFullYear();

  constructor(
    private readonly router: Router,
    private shareInformationService: ShareInformationService,
    private selectOptionNavObservable: SelectOptionNavObservable
  ) {}

  ngOnInit() {
    this.subscriptionSideNav();
    this.subscribeNavigation();
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  private subscriptionSideNav(): void {
    this.listSubscription[0] = this.shareInformationService.sideNav$.subscribe(
      () => (this.sideNavStatus = !this.sideNavStatus)
    );
  }

  private subscribeNavigation(): void {
    this.selectOptionNavObservable.updateData(
      checkOptionCurrentNav(this.router.url)
    );

    this.listSubscription[1] = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectOptionNavObservable.updateData(
          checkOptionCurrentNav(this.router.url)
        );
      }
    });
  }

  openPdfPrivacy(): void {
    window.open('./../../../../../assets/privacidad.pdf', '_blank');
  }
}
