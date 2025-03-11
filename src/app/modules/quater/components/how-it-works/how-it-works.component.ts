import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import Viewer from 'viewerjs';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowItWorksComponent {
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
