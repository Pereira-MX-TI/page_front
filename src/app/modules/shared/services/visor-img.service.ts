import { ElementRef, Injectable } from '@angular/core';
import Viewer from 'viewerjs';
import { Img } from 'src/app/modules/shared/models/img';

@Injectable({
  providedIn: 'root',
})
export class VisorImgService {
  viewer: any = null;

  viewImage(elementRef: ElementRef, data: Img | undefined): void {
    if (!data) return;
    if (!data.id || !data.url) return;
    const img = elementRef.nativeElement.querySelector(`#img-${data.id}`);
    if (!img) return;

    if (this.viewer) this.viewer.destroy();

    this.viewer = new Viewer(img, { fullscreen: true });
    this.viewer.show();
  }
}
