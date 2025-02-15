import { Component } from '@angular/core';
import { NavigationService } from '../../../../services/navigation.service';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { SesionStorageService } from './../../../../services/sesion-storage.service';

@Component({
  selector: 'app-banner-brands',
  standalone: true,
  imports: [],
  templateUrl: './banner-brands.component.html',
  styleUrls: ['./banner-brands.component.css'],
})
export class BannerBrandsComponent {
  constructor(
    private navigationService: NavigationService,
    private shareDataSearchService: ShareDataSearchService,
    private SesionStorageService: SesionStorageService
  ) {}

  viewBrand(res: string): void {
    this.SesionStorageService.remove(['viewProduct']);

    this.navigationService.navigatePage('Productos/Busqueda', { data: res });
    this.shareDataSearchService.close$.emit();
  }
}
