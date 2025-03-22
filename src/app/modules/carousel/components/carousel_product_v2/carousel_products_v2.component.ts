import { Component, Input, inject, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselPipe } from '../../pipes/carousel.pipe';
import { NavigationService } from '../../../../services/navigation.service';
import {
  Carousel_item_product,
  Product,
} from '../../../../models/carousel_item.model';
import { Carousel } from '../../../../models/carousel.model';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { MaterialComponents } from '../../../material/material.module';
import { Platform } from '@angular/cdk/platform';
import { SesionStorageService } from '../../../../services/sesion-storage.service';
import {
  convertSearch,
  encodeBase64UrlSafe,
} from '../../../../functions/convert-search.function';

@Component({
  selector: 'app-carousel-products-v2',
  standalone: true,
  imports: [CarouselModule, MaterialComponents],
  templateUrl: './carousel_products_v2.component.html',
  styleUrls: ['./carousel_products_v2.component.css'],
})
export class CarouselProductsV2Component {
  list_item = signal<Product[]>([]);

  carouselPipe: CarouselPipe = new CarouselPipe();

  @Input() set data(res: Product[]) {
    if (!res) return;

    this.list_item.set(res);
  }

  customOptions: OwlOptions = {
    lazyLoad: true,
    autoHeight: true,
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  constructor(
    public platform: Platform,
    private navigationService: NavigationService,
    private shareDataSearchService: ShareDataSearchService,
    private SesionStorageService: SesionStorageService
  ) {}

  viewProduct(res: Product): void {
    this.SesionStorageService.remove(['viewProduct']);

    const data: string = encodeBase64UrlSafe(res.nombre, String(res.id));
    this.navigationService.navigatePage(`Productos/Vista/${data}`);
    this.shareDataSearchService.close$.emit();
  }
}
