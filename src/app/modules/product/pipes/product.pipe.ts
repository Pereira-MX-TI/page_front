import { Pipe, PipeTransform } from '@angular/core';
import { FirstLetterUpperCasePipe } from '../../../services/first-letter-upper-case.pipe';
import { environment } from '../../../../environments/environment';

@Pipe({
  name: 'product',
})
export class ProductPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    const data: any = value;

    if (!data) return '-';

    switch (args[0]) {
      case 'name-filter':
        {
          const firstLetterUpperCasePipe: FirstLetterUpperCasePipe =
            new FirstLetterUpperCasePipe();
          const res: string = firstLetterUpperCasePipe.transform(
            data.toLowerCase()
          );

          if (res.length > 20) return `${res.slice(0, 20)}...`;
          return res;
        }
        break;

      case 'nameProduct':
        {
          const firstLetterUpperCasePipe: FirstLetterUpperCasePipe =
            new FirstLetterUpperCasePipe();
          const res: string = firstLetterUpperCasePipe.transform(
            data.nombre.toLowerCase()
          );

          if (res.length > 30) return `${res.slice(0, 30)}...`;
          return res;
        }
        break;

      case 'codeProduct':
        {
          return data.clave ? data.clave : '';
        }
        break;

      case 'pictureProduct':
        {
          if (data.files.length === 0) return 'assets/errors/default.avif';

          return environment.PRODUCT_URI + data.files[0].direccion;
        }
        break;

      case 'picture-product':
        {
          if (!data || data == '') return 'assets/errors/default.avif';

          return environment.PRODUCT_URI + data;
        }
        break;

      case 'name-product-full':
        {
          const firstLetterUpperCasePipe: FirstLetterUpperCasePipe =
            new FirstLetterUpperCasePipe();
          const res: string = firstLetterUpperCasePipe.transform(
            data.toLowerCase()
          );

          return res;
        }
        break;
    }

    return '';
  }
}
