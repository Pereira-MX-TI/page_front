import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CryptoService } from 'src/app/services/crypto.service';
import { forkJoin, Subscription, switchMap } from 'rxjs';
import { ShareInformationService } from 'src/app/services/share-information.service';
import { Carousel } from 'src/app/models/carousel.model';
import { HttpService } from 'src/app/services/http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  carousels: { publicity: Carousel | null; products: Carousel | null };
  listSubscription: Subscription[];

  constructor(
    private seoService: SeoService,
    private objSnackBar: MatSnackBar,
    private objHttpService: HttpService,
    private objShareInformationService: ShareInformationService,
    public navigationService: NavigationService
  ) {
    this.carousels = {
      publicity: null,
      products: null,
    };

    this.listSubscription = [new Subscription()];
  }

  ngOnInit(): void {
    this.setMetaTags();
    this.refresh();
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Inicio | Medidores de agua');
    this.seoService.setDescription('pagina inicio');

    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }

  refresh() {
    this.objShareInformationService.viewLoading$.emit(true);

    forkJoin(
      this.objHttpService.specificCarousel('publicity'),
      this.objHttpService.specificCarousel('product')
    ).subscribe(
      (responses) => {
        this.carousels.publicity = responses[0].data;
        this.carousels.products = responses[1].data;

        this.objShareInformationService.viewLoading$.emit(false);
      },
      (err) => {
        this.objShareInformationService.viewLoading$.emit(false);
        this.objSnackBar.open('Error obtener carrusel', '', {
          duration: 2500,
          panelClass: ['snackBar_error'],
        });
      }
    );
  }
}
