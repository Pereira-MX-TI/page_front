import { Injectable, EventEmitter } from '@angular/core';
import { DataTableDTO } from '../models/dataTableDTO';
import { PositionScrollTable } from '../models/position-scroll-table.model';

@Injectable({
  providedIn: 'root',
})
export class TableInformationService {
  refreshTable$: EventEmitter<DataTableDTO> = new EventEmitter<DataTableDTO>();
  scrollPositionTable: EventEmitter<PositionScrollTable> =
    new EventEmitter<PositionScrollTable>();

  setScrollPositionTable: EventEmitter<number> = new EventEmitter<number>();

  dataInput$: EventEmitter<string> = new EventEmitter<string>();
  autoComplete$: EventEmitter<string[]> = new EventEmitter<string[]>();
  search$: EventEmitter<string> = new EventEmitter<string>();
  resetInput$: EventEmitter<void> = new EventEmitter<void>();
}
