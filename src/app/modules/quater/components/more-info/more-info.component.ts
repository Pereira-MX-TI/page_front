import { Component, ElementRef } from '@angular/core';
import Viewer from 'viewerjs';

@Component({
  selector: 'app-more-info',
  standalone: true,
  imports: [],
  templateUrl: './more-info.component.html',
  styleUrl: './more-info.component.css',
})
export class MoreInfoComponent {
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
