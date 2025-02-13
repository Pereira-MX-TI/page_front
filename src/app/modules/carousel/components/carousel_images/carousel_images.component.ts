import { Component, Input, inject } from '@angular/core';
import { CarouselPipe } from '../../pipes/carousel.pipe';
import { NavigationService } from '../../../../services/navigation.service';
import { Carousel_item_publicity } from '../../../../models/carousel_item.model';
import { Carousel } from '../../../../models/carousel.model';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-carousel-images',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel_images.component.html',
  styleUrls: ['./carousel_images.component.css'],
})
export class CarouselImagesComponent {
  carousel: Carousel | null = null;
  list_item: Carousel_item_publicity[] = [];
  carouselPipe: CarouselPipe = new CarouselPipe();

  @Input() set data(res: Carousel | null) {
    if (!res) return;

    this.list_item = res.list as Carousel_item_publicity[];
  }

  constructor(
    public platform: Platform,
    private navigationService: NavigationService
  ) {}

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
