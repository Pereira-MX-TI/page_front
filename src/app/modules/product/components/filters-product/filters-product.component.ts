import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/services/http.service';
import { ShareInformationService } from 'src/app/services/share-information.service';
import { ProductPipe } from '../../pipes/product.pipe';
import { NavigationService } from 'src/app/services/navigation.service';
import { ShareDataSearchService } from 'src/app/modules/search/services/share-data-search.service';

interface Filter {
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-filters-product',
  templateUrl: './filters-product.component.html',
  styleUrls: ['./filters-product.component.css'],
})
export class FiltersProductComponent {
  brands: Filter[] = [];
  categories: Filter[] = [];
  materials: Filter[] = [];

  productPipe: ProductPipe = new ProductPipe();

  constructor(
    private matSnackBar: MatSnackBar,
    private httpService: HttpService,
    private navigationService: NavigationService,
    private shareInformationService: ShareInformationService,
    private shareDataSearchService: ShareDataSearchService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.httpService.filtersProduct().subscribe(
      ({ data }) => {
        const { brands, categories, materials } = data;

        this.brands = brands;
        this.categories = categories;
        this.materials = materials;
        this.shareInformationService.viewLoading$.emit(false);
      },
      (err) => {
        this.shareInformationService.viewLoading$.emit(false);
        this.matSnackBar.open('Error obtener carrusel', '', {
          duration: 2500,
          panelClass: ['snackBar_error'],
        });
      }
    );
  }

  applySearch(res: Filter): void {
    this.navigationService.navigatePage('Productos/Busqueda', {
      data: res.nombre,
    });

    this.shareDataSearchService.close$.emit();
  }
}
