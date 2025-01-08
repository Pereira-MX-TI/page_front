import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstLetterUpperCase',
    standalone: true,
})
export class FirstLetterUpperCasePipe implements PipeTransform {
    titleCase: TitleCasePipe = new TitleCasePipe();

    transform(value: string): string {
        if (String(value).length <= 1)
            return value === '' ? '' : this.titleCase.transform(value);

        let result = '';
        let foundFirstLetter = false;

        for (const char of value) {
            if (!foundFirstLetter && char.match(/[a-zA-Z]/)) {
                result += char.toUpperCase();
                foundFirstLetter = true;
            } else {
                result += char;
            }
        }

        return result;
    }
}
