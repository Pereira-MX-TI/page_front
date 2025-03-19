import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeadNavComponent } from '../../modules/nav-bar/components/head-nav/head-nav.component';
import { MovilNavComponent } from '../../modules/nav-bar/components/movil-nav/movil-nav.component';
import { MaterialComponents } from '../../modules/material/material.module';
import { Subscription } from 'rxjs';
import { ShareInformationService } from '../../services/share-information.service';
import { SelectOptionNavObservable } from '../../observables/select_option_nav.observable';
import { checkOptionCurrentNav } from '../../functions/check_option_current_nav.function';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
  animations: [
    trigger('sideNavAnimation', [
      state(
        'hidden',
        style({
          transform: 'translateX(-100%)', // Empuja el side nav completamente fuera de la pantalla
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          transform: 'translateX(0)', // Lo mueve a la posición original
          opacity: 1,
        })
      ),
      transition('hidden <=> visible', [
        animate('0.5s ease-in-out'), // Controla la duración y el tipo de animación
      ]),
    ]),
  ],
})
export class RootSchpComponent {
  statusSideNav: boolean = false;

  title = 'Venta de medidores de agua - Schp';
  listSubscription: Subscription[] = [new Subscription()];
  currentYear: number = new Date().getFullYear();

  constructor(
    private readonly router: Router,
    private selectOptionNavObservable: SelectOptionNavObservable
  ) {}

  ngOnInit() {
    this.subscribeNavigation();
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
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
