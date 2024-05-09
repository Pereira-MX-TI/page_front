import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { routingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MaterialModule } from './material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { LayoutModule } from '@angular/cdk/layout'

import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { HomeComponent } from './components/home/home.component'
import { FooterComponent } from './components/footer/footer.component'
import { ContactComponent } from './components/contact/contact.component'
import { AboutUsComponent } from './components/about-us/about-us.component'
import { HelpSearchComponent } from './components/help/help-search/help-search.component'
import { HelpMenuComponent } from './components/help/help-menu/help-menu.component'
import { HelpQuestionComponent } from './components/help/help-question/help-question.component'

import { HttpService } from '@services/http/http.service'
import { LocalStorageService } from '@services/local-storage/local-storage.service'
import { WindowSizeService } from '@services/window-size/window-size.service'

import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from './shared/shared.module'
import { ProductModule } from './product/product.module'

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
