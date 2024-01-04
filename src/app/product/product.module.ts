import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductPipe } from './pipes/product.pipe';
import { ModalProductComponent } from './components/modal-product/modal-product.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShopCarProductComponent } from './components/shopcar-product/shopcar-product.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    ListProductComponent,
    ViewProductComponent,
    ModalProductComponent,
    ShopCarProductComponent,
    ProductPipe
  ],
  entryComponents: [ModalProductComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ProductRoutingModule,
    SlickCarouselModule,
    NgxCaptchaModule
  ]
})
export class ProductModule { }
