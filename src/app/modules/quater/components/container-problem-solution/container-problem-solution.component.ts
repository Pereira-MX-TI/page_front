import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { Background1Component } from '../background-1/background-1.component';
import Viewer from 'viewerjs';

@Component({
  selector: 'app-container-problem-solution',
  standalone: true,
  imports: [Background1Component],
  templateUrl: './container-problem-solution.component.html',
  styleUrl: './container-problem-solution.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerProblemSolutionComponent {
  viewer: any = null;

  constructor(public elementRef: ElementRef) {}

  viewImage(elementRef: ElementRef, id: string): void {
    const img = elementRef.nativeElement.querySelector(id);

    if (!img) return;

    if (this.viewer) this.viewer.destroy();

    this.viewer = new Viewer(img, { fullscreen: true, toolbar: false });
    this.viewer.show();
  }
}
