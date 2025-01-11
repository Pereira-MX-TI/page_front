import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CryptoService } from 'src/app/services/crypto.service';
import { forkJoin, Subscription, switchMap, zip } from 'rxjs';
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
    private matSnackBar: MatSnackBar,
    private httpService: HttpService,
    private shareInformationService: ShareInformationService,
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
    this.seoService.setDescription('Pagina inicio de medidores de agua.');

    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }

  refresh() {
    this.shareInformationService.viewLoading$.emit(true);

    zip(
      this.httpService.specificCarousel('publicity'),
      this.httpService.specificCarousel('product')
    ).subscribe(
      (responses) => {
        this.carousels.publicity = responses[0].data;
        this.carousels.products = responses[1].data;

        this.shareInformationService.viewLoading$.emit(false);
      },
      (err) => {
        this.shareInformationService.viewLoading$.emit(false);
        this.matSnackBar.open('Error obtener carrusel', '', {
          duration: 2500,
          panelClass: ['snackBar_error'],
        });
      }
    );
  }
}
