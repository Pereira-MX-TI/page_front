import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableDTO } from '../../models/dataTableDTO';
import { TableInformationService } from '../../services/table-information.service';
import { Product } from '../../../../models/carousel_item.model';
import { MaterialComponents } from '../../../material/material.module';
import { NavigationService } from '../../../../services/navigation.service';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { SesionStorageService } from '../../../../services/sesion-storage.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MaterialComponents],
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

  listSubscription: Subscription[] = [new Subscription(), new Subscription()];
  rowsTable: any = [];

  constructor(
    private SesionStorageService: SesionStorageService,
    private tableInformationService: TableInformationService,
    private navigationService: NavigationService,
    private shareDataSearchService: ShareDataSearchService
  ) {}

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
        }
      );
  }

  viewProduct(res: Product): void {
    this.SesionStorageService.remove(['viewProduct']);

    const id: string = btoa(String(res.id))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    this.navigationService.navigatePage(`Productos/Vista/${id}`);
    this.shareDataSearchService.close$.emit();
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
