import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'Inicio', pathMatch: 'full' },

  {
    path: 'Inicio',
    loadChildren: () =>
      import('./modules/home/home-routing.module').then(
        (routes) => routes.homeRoutes
      ),
  },
  {
    path: 'Contacto',
    loadChildren: () =>
      import('./modules/contact/contact-routing.module').then(
        (m) => m.contactRoutes
      ),
  },
  {
    path: 'Telemetria',
    loadChildren: () =>
      import('./modules/telemetry/telemetry-routing.module').then(
        (m) => m.telemetryRoutes
      ),
  },
  {
    path: 'Servicios',
    loadChildren: () =>
      import('./modules/service/service-routing.module').then(
        (m) => m.serviceRoutes
      ),
  },
  {
    path: 'Productos',
    loadChildren: () =>
      import('./modules/product/product-routing.module').then(
        (m) => m.productRoutes
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/error-page/error-page-routing.module').then(
        (m) => m.errorPageRoutes
      ),
  },
];
