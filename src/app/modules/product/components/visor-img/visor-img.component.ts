import { Component, Input } from '@angular/core';
import { ProductPipe } from '../../pipes/product.pipe';
import { SlicePipe } from '@angular/common';

interface itemImg {
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
  @Input() set images(res: any[] | undefined) {
    if (!res) return;

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
}
