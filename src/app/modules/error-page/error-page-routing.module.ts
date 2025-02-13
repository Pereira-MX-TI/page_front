import { Routes } from '@angular/router';
import { NoFoundComponent } from './pages/page-error/no-found.component';

export const errorPageRoutes: Routes = [
  { path: '', component: NoFoundComponent, pathMatch: 'full' },
];
