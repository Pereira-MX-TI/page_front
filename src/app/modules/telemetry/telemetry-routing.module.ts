import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelemetryComponent } from './pages/telemetry/telemetry.component';

const routes: Routes = [
  { path: '', component: TelemetryComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelemetryRoutingModule {}
