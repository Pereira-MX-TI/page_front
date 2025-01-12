import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { DataTableDTO } from '../../models/dataTableDTO';
import { TableInformationService } from '../../services/table-information.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() id: string = '';
  @Input() displayedColumns: string[] = [];
  @Input() listColumns: any;
  @Input() pipeData: any;
  @Input() btnTable: number = -1;
  @Input() imgTable: any[] = [];

  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  listSubscription: Subscription[] = [new Subscription(), new Subscription()];
  rowsTable: any = [];

  constructor(private tableInformationService: TableInformationService) {}

  ngOnInit(): void {
    this.subscriptionRefresh();
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
          this.rowsTable = res.data.dataSourceFilter;
          console.log(res);
        }
      );
  }

  sentData(data: any, operation: string): void {
    this.response.emit({ id: this.id, data, operation });
  }

  checkImgTable(column: number): boolean {
    for (const element of this.imgTable) {
      if (element.column == column) return true;
    }

    return false;
  }

  checkViewCell(column: number): string {
    if (this.checkImgTable(column)) return 'img';
    else if (column === this.btnTable) return 'btn';

    return 'text';
  }
}
