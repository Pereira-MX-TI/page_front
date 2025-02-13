import { Routes } from '@angular/router';
import { ServiceComponent } from './pages/service/service.component';

export const serviceRoutes: Routes = [
  { path: '', component: ServiceComponent, pathMatch: 'full' },
];
