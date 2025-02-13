import { Component, Input } from '@angular/core';
import { ProductPipe } from '../../pipes/product.pipe';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-visor-img',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './visor-img.component.html',
  styleUrls: ['./visor-img.component.css'],
})
export class VisorImgComponent {
  @Input() set images(
    res: { direccion: string; select?: boolean }[] | undefined
  ) {
    if (!res) return;

    this.listImg = res;
  }

  listImg: { direccion: string }[] = [];
  productPipe: ProductPipe = new ProductPipe();
}
