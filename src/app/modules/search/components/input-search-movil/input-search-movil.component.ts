import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { InputSearchComponent } from '../input-search/input-search.component';

@Component({
  selector: 'app-input-search-movil',
  standalone: true,
  imports: [InputSearchComponent],
  templateUrl: './input-search-movil.component.html',
  styleUrls: ['./input-search-movil.component.css'],
})
export class InputSearchMovilComponent {
  word: string = '';
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: string
  ) {
    this.word = data;
  }
}
