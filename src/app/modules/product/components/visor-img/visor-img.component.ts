import { Component, ElementRef, inject, Input } from '@angular/core';
import { ProductPipe } from '../../pipes/product.pipe';
import Viewer from 'viewerjs';

interface itemImg {
  id: number | string;
  direccion: string;
  select: boolean;
}
@Component({
  selector: 'app-visor-img',
  standalone: true,
  templateUrl: './visor-img.component.html',
  styleUrls: ['./visor-img.component.css'],
})
export class VisorImgComponent {
  public elementRef: ElementRef = inject(ElementRef);
  viewer: any = null;

  @Input() set images(res: any[] | undefined) {
    if (!res) return;

    this.listImg = [];
    res.forEach((itr) => {
      this.listImg.push({ ...itr, select: false });
    });

    if (this.listImg.length != 0) {
      this.listImg[0].select = true;
      this.currentImg = this.listImg[0];
    }
  }

  listImg: itemImg[] = [];
  productPipe: ProductPipe = new ProductPipe();
  currentImg: itemImg = {
    id: '',
    direccion: '',
    select: true,
  };

  selectImg(res: itemImg) {
    this.listImg.forEach((itr: itemImg) => {
      itr.select = false;
    });

    res.select = true;
    this.currentImg = res;
  }

  viewImage(elementRef: ElementRef): void {
    if (!this.currentImg) return;

    const img = elementRef.nativeElement.querySelector(
      `#img-${this.currentImg.id}`
    );
    if (!img) return;

    if (this.viewer) this.viewer.destroy();

    this.viewer = new Viewer(img, { fullscreen: true, toolbar: false });
    this.viewer.show();
  }
}
