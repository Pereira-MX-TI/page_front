import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpMenuComponent } from './components/help/help-menu/help-menu.component';
import { HelpSearchComponent } from './components/help/help-search/help-search.component';
import { PageErrorComponent } from './shared/components/page-error/page-error.component';



const routes: Routes = [
  {path:"",redirectTo:"Home",pathMatch:"full"},
  {path:"Home",component:HomeComponent},
  {path:"Product",loadChildren: () => import("./product/product.module").then(m=>m.ProductModule)},
  {path:"Service",loadChildren: () => import("./service/service.module").then(m=>m.ServiceModule)},
  {path:"Quotation",component:HelpSearchComponent},
  {path:"AboutUs",component:AboutUsComponent},
  {path:"Contact",component:ContactComponent},
  {path:"Help",component:HelpMenuComponent},
  { path: '**', pathMatch: 'full', component: PageErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class routingModule { }
