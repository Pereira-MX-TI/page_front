import { Routes } from '@angular/router';
import { WaterMetersComponent } from './pages/water-meters/water-meters.component';

export const WaterMeterRoutes: Routes = [
  { path: '', component: WaterMetersComponent, pathMatch: 'full' },
];
