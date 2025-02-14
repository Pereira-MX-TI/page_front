import { Component } from '@angular/core';
import { MaterialComponents } from '../../../material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner-telemetry',
  standalone: true,
  imports: [RouterModule, MaterialComponents],
  templateUrl: './banner-telemetry.component.html',
  styleUrls: ['./banner-telemetry.component.css'],
})
export class BannerTelemetryComponent {}
