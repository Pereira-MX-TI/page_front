import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ListProductComponent,
  ShopCarProductComponent,
  ViewProductComponent,
} from '@website/product/components';
import { ViewProductGuard } from '@website/product/guards/view-product.guard';

const routes: Routes = [
  { path: 'List', component: ListProductComponent },
  { path: 'ShoppingCar', component: ShopCarProductComponent },
  {
    path: 'View/:data',
    component: ViewProductComponent,
    canActivate: [ViewProductGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
