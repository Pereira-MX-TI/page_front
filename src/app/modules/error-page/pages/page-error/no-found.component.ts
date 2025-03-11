import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-no-found',
  standalone: true,
  templateUrl: './no-found.component.html',
  styleUrls: ['./no-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoFoundComponent {}
