import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-us-info',
  standalone: true,
  imports: [],
  templateUrl: './us-info.component.html',
  styleUrl: './us-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsInfoComponent {}
