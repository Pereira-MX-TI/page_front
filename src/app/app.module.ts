import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { routingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { NavBarModule } from './modules/nav-bar/nav-bar.module';
import { LoadingModule } from './modules/loading/loading.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    routingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavBarModule,
    LoadingModule,
  ],
  // providers: [HttpService],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'en-US' },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
