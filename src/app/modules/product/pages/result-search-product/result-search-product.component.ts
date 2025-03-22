import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductPipe } from '../../pipes/product.pipe';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { DataPage } from '../../../shared/models/dataPage';
import { SeoService } from '../../../../services/seo.service';
import { HttpService } from '../../../../services/http.service';
import { DataPageService } from '../../../shared/services/data-page.service';
import { FiltersProductComponent } from '../../components/filters-product/filters-product.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { MessageEmptyComponent } from '../../../shared/components/message-empty/message-empty.component';
import { PanelComponent } from '../../../shared/components/panel/panel.component';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '../../../../../environments/environment';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      if (!data) return;

      this.dataPage.dataPaginator.search = atob(data);
      this.refresh();
    });

    this.activatedRoute.params.subscribe(({ data }) => {
      if (!data || data === 'Vista') return;

      this.dataPage.dataPaginator.search = decodeURIComponent(data);
      this.refresh();
    });
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Venta de medidores de agua | Productos');
    this.seoService.setDescription(
      'Encuentra los mejores productos hidráulicos para sistemas de agua. Innovación y eficiencia en soluciones de medición, control y distribución.'
    );

    this.seoService.setImage(environment.ogImage);
    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }

  refresh(): void {
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
        },
        () => {
          this.matSnackBar.open('Error de carga', '', {
            duration: 2500,
            panelClass: ['snackBar_error'],
          });
        }
      );
  }

  changePagination(event: PageEvent): void {
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
        },
        () => {
          this.matSnackBar.open('Error de carga', '', {
            duration: 2500,
            panelClass: ['snackBar_error'],
          });
        }
      );
  }
}
