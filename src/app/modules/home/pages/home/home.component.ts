import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, zip } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { Carousel } from '../../../../models/carousel.model';
import { SeoService } from '../../../../services/seo.service';
import { HttpService } from '../../../../services/http.service';
import { ShareInformationService } from '../../../../services/share-information.service';
import { NavigationService } from '../../../../services/navigation.service';
import { CarouselImagesComponent } from '../../../carousel/components/carousel_images/carousel_images.component';
import { BannerBrandsComponent } from '../../components/banner-brands/banner-brands.component';
import { QuestionProductComponent } from '../../components/question-product/question-product.component';
import { CarouselProductsComponent } from '../../../carousel/components/carousel_product/carousel_products.component';
import { BannerTelemetryComponent } from '../../components/banner-telemetry/banner-telemetry.component';
import { BannerCategoryComponent } from '../../components/banner-category/banner-category.component';
import { BannerQuotationComponent } from '../../components/banner-quotation/banner-quotation.component';
import { BannerTypeWatermeterComponent } from '../../components/banner-type-watermeter/banner-type-watermeter.component';
import { BannerSomeProductsComponent } from '../../components/banner-some-products/banner-some-products.component';
import { SesionStorageService } from '../../../../services/sesion-storage.service';
import { BannerQuaterComponent } from '../../components/banner-quater/banner-quater.component';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    CarouselImagesComponent,
    BannerBrandsComponent,
    QuestionProductComponent,
    CarouselProductsComponent,
    BannerTelemetryComponent,
    BannerCategoryComponent,
    BannerQuotationComponent,
    BannerTypeWatermeterComponent,
    BannerSomeProductsComponent,
    BannerQuaterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.5s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  carousels: { publicity: Carousel | null; products: Carousel | null };
  listSubscription: Subscription[];

  constructor(
    private platform: Platform,
    private seoService: SeoService,
    private matSnackBar: MatSnackBar,
    private httpService: HttpService,
    private shareInformationService: ShareInformationService,
    private SesionStorageService: SesionStorageService,
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
    this.seoService.setDescription(
      'Encuentra los mejores medidores de agua para tu hogar o negocio. Soluciones precisas y confiables para el control del consumo de agua.'
    );

    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }

  refresh() {
    if (this.SesionStorageService.exist('carouselsHome')) {
      const { publicity, products } =
        this.SesionStorageService.get('carouselsHome');

      this.carousels.publicity = publicity;
      this.carousels.products = products;

      return;
    }

    this.shareInformationService.viewLoading$.emit(true);

    zip(
      this.httpService.specificCarousel('publicity'),
      this.httpService.specificCarousel('product')
    ).subscribe(
      (responses) => {
        this.carousels.publicity = responses[0].data;
        this.carousels.products = responses[1].data;

        this.SesionStorageService.set('carouselsHome', {
          publicity: this.carousels.publicity,
          products: this.carousels.products,
        });

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
