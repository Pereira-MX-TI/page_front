import { Component } from '@angular/core';
import { SizeImgPipe } from '../../../../pipes/size-img.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-question-product',
  standalone: true,
  imports: [SizeImgPipe, AsyncPipe],
  templateUrl: './question-product.component.html',
  styleUrls: ['./question-product.component.css'],
})
export class QuestionProductComponent {}
