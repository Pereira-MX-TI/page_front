import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductPipe } from '../../pipes/product.pipe';
import { Filter } from '../../models/filter.model';
import { MatDialog } from '@angular/material/dialog';
import { ViewMoreItemsModalComponent } from '../view-more-items-modal/view-more-items-modal.component';
import { HttpService } from '../../../../services/http.service';
import { NavigationService } from '../../../../services/navigation.service';
import { ShareInformationService } from '../../../../services/share-information.service';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { SlicePipe } from '@angular/common';
import { SesionStorageService } from '../../../../services/sesion-storage.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-filters-product',
  standalone: true,
  imports: [RouterModule, SlicePipe],
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
    private SesionStorageService: SesionStorageService,
    private httpService: HttpService,
    private navigationService: NavigationService,
    private shareInformationService: ShareInformationService,
    public shareDataSearchService: ShareDataSearchService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    if (this.SesionStorageService.exist('filtersProduct')) {
      const { brands, categories, materials } =
        this.SesionStorageService.get('filtersProduct');

      this.brands = brands;
      this.categories = categories;
      this.materials = materials;

      return;
    }

    this.httpService.filtersProduct().subscribe(
      ({ data }) => {
        const { brands, categories, materials } = data;

        this.SesionStorageService.set('filtersProduct', data);

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

  openModal(list: Filter[], title: string): void {
    const dialogRef = this.dialog.open(ViewMoreItemsModalComponent, {
      closeOnNavigation: true,
      disableClose: true,
      autoFocus: false,
      data: { list, title },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (!(response != undefined && response != null && response)) return;

      this.navigationService.navigatePage('Productos/Busqueda', {
        data: this.productPipe.transform(response.nombre, 'name-filter'),
      });

      this.shareDataSearchService.close$.emit();
    });
  }
}
