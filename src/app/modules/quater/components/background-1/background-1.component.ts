import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-background-1',
  standalone: true,
  imports: [],
  templateUrl: './background-1.component.html',
  styleUrl: './background-1.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Background1Component {}
