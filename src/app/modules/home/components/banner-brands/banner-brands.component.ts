import { Component } from '@angular/core';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner-brands',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './banner-brands.component.html',
  styleUrls: ['./banner-brands.component.css'],
})
export class BannerBrandsComponent {
  constructor(public shareDataSearchService: ShareDataSearchService) {}
}
