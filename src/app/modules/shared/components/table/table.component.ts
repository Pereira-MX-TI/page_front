import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDTO } from '../../models/dataTableDTO';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { WindowSizeService } from 'src/app/services/window-size.service';
import { TableInformationService } from '../../services/table-information.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport)
  cdkVirtual: CdkVirtualScrollViewport | null = null;

  @Input() id: string = '';
  @Input() displayedColumns: string[] = [];
  @Input() listColumns: any;
  @Input() pipeData: any;
  @Input() pipeOpc: number = 0;
  @Input() btnTable: any[] = [];
  @Input() imgTable: any[] = [];
  @Input() checkBoxTable: any = null;
  @Input() radioTable: any = null;

  @Output() response: EventEmitter<any> = new EventEmitter<any>();
  @Input() viewValidate: any = { view: false, opc: -1, column: -1 };

  listSubscription: Subscription[] = [new Subscription(), new Subscription()];
  rowsTable: TableVirtualScrollDataSource<any> =
    new TableVirtualScrollDataSource<any>([]);

  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private windowSizeService: WindowSizeService,
    private tableInformationService: TableInformationService
  ) {}

  ngOnInit(): void {
    this.subscriptionRefresh();
    this.subscriptionSetPositionScroll();
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  private subscriptionRefresh(): void {
    this.listSubscription[0] =
      this.tableInformationService.refreshTable$.subscribe(
        (res: DataTableDTO) => {
          if (res.opc === 0) {
            {
              if (res.name != this.id) return;

              this.rowsTable = new TableVirtualScrollDataSource(
                res.data.dataSourceFilter.map((item, index) => ({
                  ...item,
                  index_row: index,
                }))
              );

              this.cdr.detectChanges();
            }
          }

          this.rowsTable._updateChangeSubscription();
        }
      );
  }

  private subscriptionSetPositionScroll(): void {
    this.listSubscription[1] =
      this.tableInformationService.setScrollPositionTable
        .pipe(debounceTime(100))
        .subscribe((res: number) => {
          if (this.cdkVirtual) {
            const viewportSize: number = this.cdkVirtual.getViewportSize();
            this.cdkVirtual?.scrollToOffset(res - viewportSize, 'smooth');
          }
        });
  }

  onScrolledIndexChange() {
    if (!this.cdkVirtual || this.rowsTable.data.length === 0) return;

    const items =
      this.cdkVirtual.getRenderedRange().end -
      this.cdkVirtual.getRenderedRange().start;
    const itemSize =
      this.cdkVirtual.elementRef.nativeElement.scrollHeight / items;
    const totalContentSize = items * itemSize;

    const scrollOffset: number = this.cdkVirtual.measureScrollOffset();
    const viewportSize: number = this.cdkVirtual.getViewportSize();
    const position: number = scrollOffset + viewportSize;

    this.tableInformationService.scrollPositionTable.emit({
      position,
      end: position >= totalContentSize,
      is_movil: this.windowSizeService.checkMaxScreenSize(1024),
    });
  }

  sentData(data: any, operation: string): void {
    this.response.emit({ id: this.id, data, operation });
  }

  checkBtnTable(column: number): boolean {
    for (const element of this.btnTable) {
      if (element.column == column) return true;
    }

    return false;
  }

  checkBoxBtnTable(column: number): boolean {
    if (!this.checkBoxTable) return false;
    if (this.checkBoxTable.column !== column) return false;

    return true;
  }

  radioBtnTable(column: number): boolean {
    if (!this.radioTable) return false;
    if (this.radioTable.column !== column) return false;

    return true;
  }

  checkImgTable(column: number): boolean {
    for (const element of this.imgTable) {
      if (element.column == column) return true;
    }

    return false;
  }

  checkViewCell(column: number): string {
    if (this.checkImgTable(column)) return 'img';
    else if (this.checkBtnTable(column)) return 'btn';
    else if (this.checkBoxBtnTable(column)) return 'check';
    else if (this.radioBtnTable(column)) return 'radio';

    return 'text';
  }
}
