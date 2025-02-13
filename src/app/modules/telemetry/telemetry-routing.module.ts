import { Routes } from '@angular/router';
import { TelemetryComponent } from './pages/telemetry/telemetry.component';

export const telemetryRoutes: Routes = [
  { path: '', component: TelemetryComponent, pathMatch: 'full' },
];
