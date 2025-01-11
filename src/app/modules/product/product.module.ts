import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './pages/product/product.component';
import { FiltersProductComponent } from './components/filters-product/filters-product.component';
import { CarouselsModule } from '../carousel/carousel.module';
import { ResultSearchProductComponent } from './pages/result-search-product/result-search-product.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent,
    FiltersProductComponent,
    ResultSearchProductComponent,
  ],
  imports: [CommonModule, CarouselsModule, SharedModule, ProductRoutingModule],
})
export class ProductModule {}
