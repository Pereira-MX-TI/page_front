import { Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';

export const contactRoutes: Routes = [
  { path: '', component: ContactComponent, pathMatch: 'full' },
];
