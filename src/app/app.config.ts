import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    CookieService,
    provideRouter(routes),
    provideClientHydration(withNoHttpTransferCache()),
    provideHttpClient(withFetch(), withInterceptors([ResponseInterceptor])),
    {
      provide: 'googleTagManagerId',
      useValue: environment.googleTagManager,
    },

    // provideZoneChangeDetection({ eventCoalescing: true }),
    // provideClientHydration(),
    provideAnimationsAsync(),
  ],
};
