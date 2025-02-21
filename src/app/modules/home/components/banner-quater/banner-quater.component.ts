import { Component } from '@angular/core';
import { MaterialComponents } from '../../../material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner-quater',
  standalone: true,
  imports: [RouterModule, MaterialComponents],
  templateUrl: './banner-quater.component.html',
  styleUrl: './banner-quater.component.css',
})
export class BannerQuaterComponent {}
