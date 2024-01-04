import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ShopCarProductComponent } from './components/shopcar-product/shopcar-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ViewProductGuard } from './guards/view-product.guard';

const routes: Routes = [
  {path:"List",component:ListProductComponent},
  {path:"ShoppingCar",component:ShopCarProductComponent},
  {path:"View/:data",component:ViewProductComponent,canActivate:[ViewProductGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
