import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import {
  ListProductComponent,
  ModalProductComponent,
  ShopCarProductComponent,
  ViewProductComponent,
} from '@website/product/components';
import { MaterialModule } from '@material/material.module';
import { ProductPipe } from '@website/product/pipes/product.pipe';
import { ProductRoutingModule } from '@website/product/product-routing.module';
import { SharedModule } from '@website/shared/shared.module';

@NgModule({
  declarations: [
    ListProductComponent,
    ViewProductComponent,
    ModalProductComponent,
    ShopCarProductComponent,
    ProductPipe,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ProductRoutingModule,
    SlickCarouselModule,
    NgxCaptchaModule,
  ],
})
export class ProductModule {}
