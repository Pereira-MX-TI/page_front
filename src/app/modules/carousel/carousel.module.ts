import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { CarouselImagesComponent } from './components/carousel_images/carousel_images.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselPipe } from './pipes/carousel.pipe';
import { CarouselProductsComponent } from './components/carousel_product/carousel_products.component';

@NgModule({
  declarations: [
    CarouselImagesComponent,
    CarouselProductsComponent,
    CarouselPipe,
  ],
  exports: [CarouselImagesComponent, CarouselProductsComponent],
  imports: [CommonModule, MaterialModule, CarouselModule],
})
export class CarouselsModule {}
