import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AboutUsComponent,
  ContactComponent,
  HelpMenuComponent,
  HelpSearchComponent,
  HomeComponent,
} from '@website/components';
import { PageErrorComponent } from '@website/shared/components';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  {
    path: 'Product',
    loadChildren: () =>
      import('./website/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'Service',
    loadChildren: () =>
      import('./website/service/service.module').then((m) => m.ServiceModule),
  },
  { path: 'Quotation', component: HelpSearchComponent },
  { path: 'AboutUs', component: AboutUsComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Help', component: HelpMenuComponent },
  { path: '**', pathMatch: 'full', component: PageErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class routingModule {}
