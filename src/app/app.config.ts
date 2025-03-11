import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
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
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { CookieService } from 'ngx-cookie-service';

import {
  provideTanStackQuery,
  QueryClient,
  withDevtools,
} from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [
    CookieService,
    provideRouter(routes),
    provideExperimentalZonelessChangeDetection(),
    provideClientHydration(withNoHttpTransferCache()),
    provideHttpClient(withFetch(), withInterceptors([ResponseInterceptor])),
    provideTanStackQuery(new QueryClient(), withDevtools()),
    provideAnimationsAsync(),
  ],
};
