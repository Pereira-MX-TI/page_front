import { Component } from '@angular/core';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner-some-products',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './banner-some-products.component.html',
  styleUrls: ['./banner-some-products.component.css'],
})
export class BannerSomeProductsComponent {
  constructor(public shareDataSearchService: ShareDataSearchService) {}
}
