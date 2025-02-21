import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductPipe } from '../../pipes/product.pipe';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { DataPage } from '../../../shared/models/dataPage';
import { SeoService } from '../../../../services/seo.service';
import { HttpService } from '../../../../services/http.service';
import { ShareInformationService } from '../../../../services/share-information.service';
import { DataPageService } from '../../../shared/services/data-page.service';
import { FiltersProductComponent } from '../../components/filters-product/filters-product.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { MessageEmptyComponent } from '../../../shared/components/message-empty/message-empty.component';
import { PanelComponent } from '../../../shared/components/panel/panel.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-result-search-product',
  standalone: true,
  imports: [
    PanelComponent,
    FiltersProductComponent,
    TableComponent,
    MessageEmptyComponent,
  ],
  templateUrl: './result-search-product.component.html',
  styleUrls: ['./result-search-product.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.5s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ResultSearchProductComponent implements OnInit, OnDestroy {
  dataPage: DataPage;
  listColumns: any;
  displayedColumns: string[];
  productPipe: ProductPipe = new ProductPipe();
  listSubscription: Subscription[] = [new Subscription()];

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
  }

  ngOnInit(): void {
    this.setMetaTags();
    this.subscriptionChangeUrl();
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  private subscriptionChangeUrl(): void {
    this.activatedRoute.queryParams.subscribe(({ data }) => {
      this.dataPage.dataPaginator.search = data;
      this.refresh();
    });
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Productos | Medidores de agua');
    this.seoService.setDescription(
      'Encuentra los mejores productos hidráulicos para sistemas de agua. Innovación y eficiencia en soluciones de medición, control y distribución.'
    );

    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
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

  changePagination(event: PageEvent): void {
    this.shareInformationService.viewLoading$.emit(true);
    this.dataPage.dataPaginator = this.dataPageService.paginationData(
      this.dataPage.dataPaginator,
      event
    );

    this.httpService
      .listProduct({
        totalRecords: 0,
        offset: this.dataPage.dataPaginator.offset,
        limit: this.dataPage.dataPaginator.limit,
        word: this.dataPage.dataPaginator.search,
        orderby: 'ASC',
      })
      .subscribe(
        ({ data }) => {
          const { list } = data;
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
