import { Component, Input, inject } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Carousel } from 'src/app/models/carousel.model';
import { CarouselPipe } from '../../pipes/carousel.pipe';
import { NavigationService } from '../../../../services/navigation.service';
import { Carousel_item_publicity } from 'src/app/models/carousel_item.model';

@Component({
  selector: 'app-carousel-images',
  templateUrl: './carousel_images.component.html',
  styleUrls: ['./carousel_images.component.css'],
})
export class CarouselImagesComponent {
  navigationService: NavigationService = inject(NavigationService);
  carousel: Carousel | null = null;
  list_item: Carousel_item_publicity[] = [];
  carouselPipe: CarouselPipe = new CarouselPipe();

  @Input() set data(res: Carousel | null) {
    if (!res) return;

    this.list_item = res.list as Carousel_item_publicity[];
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
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  navigateLink(res: string): void {
    if (res === '') return;

    this.navigationService.navigatePage(res);
  }
}
