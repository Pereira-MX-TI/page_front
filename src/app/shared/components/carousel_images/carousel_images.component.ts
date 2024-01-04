import { Component, OnInit,Input} from '@angular/core';
import { ProductPipe } from 'src/app/product/pipes/product.pipe';

@Component({
  selector: 'carousel_images',
  templateUrl: './carousel_images.component.html',
  styleUrls: ['./carousel_images.component.css']
})
export class CarouselComponent implements OnInit {

  @Input("dataSlides") dataSlides:any;
  @Input("autoplay") autoplay:boolean;

  slideConfig:any;
  pipeProduct:ProductPipe;

  constructor() 
  {
    this.pipeProduct = new ProductPipe();
  }

  ngOnInit() 
  {
    this.slideConfig = {
      "dots": true,
      "autoplay": this.autoplay,
      "draggable": true,
      "autoplaySpeed": 5000,
      "slidesToShow": 1, 
      "slidesToScroll": 1,
      "prevArrow": false,
      "nextArrow": false,
      event: {
        beforeChange: function () {},
        afterChange: function () {}
      },
      responsive: []};
  }
}