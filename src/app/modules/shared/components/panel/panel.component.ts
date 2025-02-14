import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataPaginator } from '../../models/dataPaginator';
import { SharePanelService } from '../../services/panel-share.service';
import { ShareInformationService } from '../../../../services/share-information.service';
import { DataPageService } from '../../services/data-page.service';
import { MaterialComponents } from '../../../material/material.module';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [MaterialComponents],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit, AfterViewInit, OnDestroy {
  dataPaginator: DataPaginator;
  pageSizeOptions: number[];
  listSubscription: Subscription[] = [];

  @ViewChild('paginator') paginator!: MatPaginator;

  @Output('btnEvent') btnEvent: EventEmitter<any>;
  @Output('changePage') changePage: EventEmitter<any>;
  clickInputSearch: boolean = false;

  constructor(
    private viewportScroller: ViewportScroller,
    private sharePanelService: SharePanelService,
    private dataPageService: DataPageService
  ) {
    this.pageSizeOptions = [25, 50, 100];

    this.btnEvent = new EventEmitter<any>();
    this.changePage = new EventEmitter<any>();

    this.dataPaginator = this.dataPageService.buildDataPaginator();
  }

  ngOnInit(): void {
    this.subscriptionRefresh();
    this.subscriptionPanelSize();
  }

  ngAfterViewInit() {
    this.paginator._intl.nextPageLabel = '';
    this.paginator._intl.previousPageLabel = '';
    this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  private subscriptionRefresh(): void {
    this.listSubscription[1] = this.sharePanelService.refreshPanel$.subscribe(
      (res: DataPaginator) => {
        if (!this.paginator) return;

        this.pageSizeOptions = this.reBuildPageSize(res.quantityTotal);
        this.dataPaginator = res;
        this.paginator.pageIndex = this.dataPaginator.pageIndex;
        this.paginator.pageSize = this.dataPaginator.pageSize;

        this.paginator._intl.getRangeLabel = (
          page: number,
          pageSize: number,
          length: number
        ) => {
          const start = page * pageSize + 1;
          const end =
            (page + 1) * pageSize > length ? length : (page + 1) * pageSize;
          return `${start} - ${end} of ${length}`;
        };
      }
    );
  }

  private subscriptionPanelSize(): void {
    this.listSubscription[2] = this.sharePanelService.panelPageSize$.subscribe(
      (res: number[]) => {
        this.pageSizeOptions = res;
      }
    );
  }

  reBuildPageSize(quantityTotal: number): number[] {
    const auxPageSizeOptions: number[] = [];
    this.pageSizeOptions = [25, 50, 100];

    for (const pageSizeOption of this.pageSizeOptions) {
      if (pageSizeOption < quantityTotal)
        auxPageSizeOptions.push(pageSizeOption);
    }

    if (
      auxPageSizeOptions.length != 0 &&
      auxPageSizeOptions[auxPageSizeOptions.length - 1] < quantityTotal
    )
      auxPageSizeOptions.push(quantityTotal);

    return auxPageSizeOptions;
  }

  changePagination(data: any): void {
    this.changePage.emit(data);
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
