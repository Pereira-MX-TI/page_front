import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialComponents } from '../../../material/material.module';

@Component({
  selector: 'app-maintenance-modal',
  standalone: true,
  imports: [MaterialComponents],
  templateUrl: './maintenance-modal.component.html',
  styleUrl: './maintenance-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaintenanceModalComponent {}
