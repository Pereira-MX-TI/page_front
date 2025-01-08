import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../material/material.module';
import { CarouselsModule } from '../carousel/carousel.module';
import { BannerBrandsComponent } from './components/banner-brands/banner-brands.component';
import { QuestionProductComponent } from './components/question-product/question-product.component';
import { BannerTelemetryComponent } from './components/banner-telemetry/banner-telemetry.component';
import { BannerQuotationComponent } from './components/banner-quotation/banner-quotation.component';
import { BannerTypeWatermeterComponent } from './components/banner-type-watermeter/banner-type-watermeter.component';
import { BannerCategoryComponent } from './components/banner-category/banner-category.component';
import { BannerSomeProductsComponent } from './components/banner-some-products/banner-some-products.component';

@NgModule({
  declarations: [HomeComponent, BannerBrandsComponent, QuestionProductComponent, BannerTelemetryComponent, BannerQuotationComponent, BannerTypeWatermeterComponent, BannerCategoryComponent, BannerSomeProductsComponent],
  imports: [CommonModule, HomeRoutingModule, MaterialModule, CarouselsModule],
})
export class HomeModule {}
