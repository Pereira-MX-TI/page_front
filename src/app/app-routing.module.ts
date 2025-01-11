import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
  {
    path: 'Inicio',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'Contacto',
    loadChildren: () =>
      import('./modules/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'Telemetria',
    loadChildren: () =>
      import('./modules/telemetry/telemetry.module').then(
        (m) => m.TelemetryModule
      ),
  },
  {
    path: 'Servicios',
    loadChildren: () =>
      import('./modules/service/service.module').then((m) => m.ServiceModule),
  },
  {
    path: 'Productos',
    loadChildren: () =>
      import('./modules/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/error-page/error-page.module').then(
        (m) => m.ErrorPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class routingModule {}
