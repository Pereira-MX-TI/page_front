import { Component, Input, inject } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Carousel } from 'src/app/models/carousel.model';
import { CarouselPipe } from '../../pipes/carousel.pipe';
import { NavigationService } from '../../../../services/navigation.service';
import { Carousel_item_product } from 'src/app/models/carousel_item.model';

@Component({
  selector: 'app-carousel-products',
  templateUrl: './carousel_products.component.html',
  styleUrls: ['./carousel_products.component.css'],
})
export class CarouselProductsComponent {
  navigationService: NavigationService = inject(NavigationService);
  list_item: Carousel_item_product[] = [];
  carouselPipe: CarouselPipe = new CarouselPipe();

  @Input() set data(res: Carousel | null) {
    if (!res) return;

    this.list_item = res.list as Carousel_item_product[];
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

  viewProduct(res: string): void {
    if (res === '') return;

    this.navigationService.navigatePage(res);
  }
}
