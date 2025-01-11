import { Pipe, PipeTransform } from '@angular/core';
import { FirstLetterUpperCasePipe } from 'src/app/services/first-letter-upper-case.pipe';

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
    }

    return '';
  }
}
