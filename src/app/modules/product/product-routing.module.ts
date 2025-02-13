import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { ResultSearchProductComponent } from './pages/result-search-product/result-search-product.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { resultSearchProductGuard } from './guards/result-search-product.guard';
import { viewProductGuard } from './guards/view-product.guard';

export const productRoutes: Routes = [
  { path: '', component: ProductComponent, pathMatch: 'full' },
  {
    path: 'Busqueda',
    canActivate: [resultSearchProductGuard],
    component: ResultSearchProductComponent,
  },
  {
    path: 'Vista',
    canActivate: [viewProductGuard],
    component: ViewProductComponent,
  },
];
