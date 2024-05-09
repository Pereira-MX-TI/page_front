import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';

import {
  HttpService,
  LocalStorageService,
  WindowSizeService,
} from '@core/services';
import {
  AboutUsComponent,
  ContactComponent,
  FooterComponent,
  HelpMenuComponent,
  HelpQuestionComponent,
  HelpSearchComponent,
  HomeComponent,
  NavBarComponent,
} from '@website/components';
import { AppComponent } from './app.component';
import { MaterialModule } from '@material/material.module';
import { ProductModule } from '@website/product/product.module';
import { SharedModule } from '@website/shared/shared.module';
import { routingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    AboutUsComponent,
    HelpSearchComponent,
    HelpMenuComponent,
    HelpQuestionComponent,
  ],
  imports: [
    ProductModule,
    BrowserModule,
    routingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
  ],
  providers: [
    HttpService,
    WindowSizeService,
    LocalStorageService,
    provideClientHydration(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
