import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { Subscription } from 'rxjs';
import AOS from 'aos';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
    private readonly platform: Platform,
    private readonly router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    if (this.platform.isBrowser) {
      AOS.init();
    }

    this.subscriptionPositionScroll();
  }

  private subscriptionPositionScroll() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
