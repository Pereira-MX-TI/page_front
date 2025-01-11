import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { ResultSearchProductComponent } from './pages/result-search-product/result-search-product.component';

const routes: Routes = [
  { path: '', component: ProductComponent, pathMatch: 'full' },
  { path: 'Busqueda', component: ResultSearchProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
