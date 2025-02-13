import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FirstLetterUpperCasePipe } from '../../../services/first-letter-upper-case.pipe';

@Pipe({
  name: 'carousel',
})
export class CarouselPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    const data: any = value;

    if (!data) return '-';

    switch (args[0]) {
      case 'image-publicity':
        {
          return environment.FILE_URI + data.url;
        }
        break;

      case 'image-product':
        {
          if (data.length === 0) return 'assets/errors/default.avif';

          return environment.PRODUCT_URI + data[0].direccion;
        }
        break;

      case 'name-product':
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
    }

    return '';
  }
}
