import { Component } from '@angular/core';
import { NavigationService } from '../../../../services/navigation.service';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { SesionStorageService } from './../../../../services/sesion-storage.service';

@Component({
  selector: 'app-banner-some-products',
  standalone: true,
  templateUrl: './banner-some-products.component.html',
  styleUrls: ['./banner-some-products.component.css'],
})
export class BannerSomeProductsComponent {
  constructor(
    private navigationService: NavigationService,
    private shareDataSearchService: ShareDataSearchService,
    private SesionStorageService: SesionStorageService
  ) {}

  viewProduct(res: string): void {
    this.SesionStorageService.remove(['viewProduct']);

    this.navigationService.navigatePage('Productos/Busqueda', { data: res });
    this.shareDataSearchService.close$.emit();
  }
}
