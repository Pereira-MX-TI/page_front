import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataPage } from 'src/app/modules/shared/models/dataPage';
import { DataPageService } from 'src/app/modules/shared/services/data-page.service';
import { HttpService } from 'src/app/services/http.service';
import { SeoService } from 'src/app/services/seo.service';
import { ShareInformationService } from 'src/app/services/share-information.service';
import { ProductPipe } from '../../pipes/product.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-search-product',
  templateUrl: './result-search-product.component.html',
  styleUrls: ['./result-search-product.component.css'],
})
export class ResultSearchProductComponent {
  dataPage: DataPage;
  listColumns: any;
  displayedColumns: string[];
  productPipe: ProductPipe = new ProductPipe();

  constructor(
    private seoService: SeoService,
    private matSnackBar: MatSnackBar,
    private httpService: HttpService,
    private shareInformationService: ShareInformationService,
    private dataPageService: DataPageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.displayedColumns = ['pictureProduct', 'nameProduct', 'btn'];
    this.listColumns = { pictureProduct: '', nameProduct: '', btn: '' };

    this.dataPage = this.dataPageService.buildDataPage();
    this.dataPage.dataPaginator.search =
      this.activatedRoute.snapshot.queryParamMap.get('data')!;
  }

  ngOnInit(): void {
    this.refresh();
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Productos | Medidores de agua');
    this.seoService.setDescription('Pagina de productos de hidráulicos.');

    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }

  selectColumn({ data, operation }: any): void {
    if (operation !== 'view') return;
    // this.navigationService.navigatePage(
    //   '/DashBoard/Pickup/Detail/' +
    //     btoa(this.cryptoService.encrypted(data)).replace(
    //       new RegExp('/', 'g'),
    //       '~'
    //     )
    // );
  }

  refresh(): void {
    this.shareInformationService.viewLoading$.emit(true);

    this.dataPage = this.dataPageService.searchData(
      this.dataPage,
      'tableProduct',
      0
    );

    this.httpService
      .listProduct({
        totalRecords: 1,
        offset: this.dataPage.dataPaginator.offset,
        limit: this.dataPage.dataPaginator.limit,
        word: this.dataPage.dataPaginator.search,
        orderby: 'ASC',
      })
      .subscribe(
        ({ data }) => {
          const { list, totalRecords } = data;

          console.log(data);
          this.dataPage.dataPaginator = this.dataPageService.newDataPaginator(
            this.dataPage.dataPaginator,
            totalRecords
          );
          this.dataPage = this.dataPageService.dataSourceFill(
            this.dataPage,
            list,
            0,
            'tableProduct'
          );
          this.shareInformationService.viewLoading$.emit(false);
        },
        () => {
          this.shareInformationService.viewLoading$.emit(false);
          this.matSnackBar.open('Error de carga', '', {
            duration: 2500,
            panelClass: ['snackBar_error'],
          });
        }
      );
  }
}
