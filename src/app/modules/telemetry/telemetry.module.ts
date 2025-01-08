import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelemetryRoutingModule } from './telemetry-routing.module';
import { TelemetryComponent } from './pages/telemetry/telemetry.component';


@NgModule({
  declarations: [
    TelemetryComponent
  ],
  imports: [
    CommonModule,
    TelemetryRoutingModule
  ]
})
export class TelemetryModule { }
