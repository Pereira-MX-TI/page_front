import { Pipe, PipeTransform } from '@angular/core';
import { FirstLetterUpperCasePipe } from 'src/app/services/first-letter-upper-case.pipe';
import { environment } from 'src/environments/environment';

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
          return environment.API_FILE + data.url;
        }
        break;

      case 'image-product':
        {
          if (data.lenght === 0) return 'assets/errors/default.avif';

          return environment.API_FILE + data[0].direccion.replace('files/', '');
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
