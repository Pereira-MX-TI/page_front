import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TableInformationService } from './table-information.service';
import { DataTable } from '../models/dataTable';
import { DataPage } from '../models/dataPage';
import { DataPaginator } from '../models/dataPaginator';
import { SharePanelService } from './panel-share.service';

@Injectable({
  providedIn: 'root',
})
export class DataPageService {
  constructor(
    private sharePanelService: SharePanelService,
    private tableInformationService: TableInformationService
  ) {}

  buildDataPage(): DataPage {
    return {
      refresh: false,
      btnAction: {},
      data: {},
      opcTab: 0,
      scrollPosition: 0,
      dataPaginator: {
        search: '',
        quantityTotal: 0,
        pageIndex: 0,
        offset: 0,
        pageSize: 25,
        limit: 25,
      },
      dataTable: {
        dataSourceFilter: [],
        opcFill: 0,
      },
    };
  }

  buildDataPaginator(): DataPaginator {
    return {
      search: '',
      quantityTotal: 0,
      pageIndex: 0,
      offset: 0,
      pageSize: 25,
      limit: 25,
    };
  }

  buildDataTable(): DataTable {
    return {
      dataSourceFilter: [],
      opcFill: 0,
    };
  }

  paginationData(data: DataPaginator, pageEvent: PageEvent): DataPaginator {
    data.pageIndex = pageEvent.pageIndex;
    data.pageSize = pageEvent.pageSize;
    data.limit = pageEvent.pageSize;
    data.offset = pageEvent.pageIndex * pageEvent.pageSize;

    return data;
  }

  newDataTable(data: DataTable, opcFill: number): DataTable {
    data.opcFill = opcFill;
    return data;
  }

  newDataPaginator(data: DataPaginator, quantity: number = 0): DataPaginator {
    data.quantityTotal = quantity;

    this.sharePanelService.refreshPanel$.emit(data);
    return data;
  }

  searchData(data: DataPage, name: string, opc: number): DataPage {
    const newData: DataPage = {
      refresh: false,
      btnAction: data.btnAction,
      opcTab: 0,
      scrollPosition: 0,
      dataPaginator: {
        quantityTotal: 0,
        pageIndex: 0,
        offset: 0,
        pageSize: data.dataPaginator.pageSize,
        limit: data.dataPaginator.limit,
        search: data.dataPaginator.search,
      },
      dataTable: {
        dataSourceFilter: [],
        opcFill: 0,
      },
    };

    this.tableInformationService.refreshTable$.emit({
      data: newData.dataTable,
      name,
      opc,
    });
    return newData;
  }

  refreshData(data: DataPage, name: string, opc: number): DataPage {
    const newData: DataPage = {
      refresh: false,
      btnAction: {},
      opcTab: data.opcTab,
      data: {},
      scrollPosition: 0,
      dataPaginator: {
        quantityTotal: 0,
        pageIndex: 0,
        offset: 0,
        pageSize: data.dataPaginator.pageSize,
        limit: data.dataPaginator.limit,
        search: '',
      },
      dataTable: {
        dataSourceFilter: [],
        opcFill: 0,
      },
    };

    this.tableInformationService.refreshTable$.emit({
      data: newData.dataTable,
      name,
      opc,
    });
    return newData;
  }

  reloadDataStore(data: DataPage): DataPage {
    return {
      ...data,
      dataTable: {
        ...data.dataTable,
        dataSourceFilter: [],
        opcFill: 0,
      },
    };
  }

  dataSourceFill(
    dataPage: DataPage,
    data: any[],
    opcFill: number,
    nameTable: string = '',
    opc: number = 0
  ): DataPage {
    switch (opcFill) {
      case 0:
        {
          dataPage.dataPaginator.offset += dataPage.dataPaginator.pageSize;
          dataPage.dataTable.dataSourceFilter = data;
        }
        break;
      case 1:
        {
          dataPage.dataTable.dataSourceFilter = data;
          dataPage.dataPaginator.offset = dataPage.dataPaginator.pageSize;
          dataPage.dataPaginator.limit = 25;
        }
        break;
      case 2:
        {
          if (data.length != 0) {
            dataPage.dataPaginator.pageSize += 25;
            dataPage.dataPaginator.offset += 25;

            const listData: any[] = dataPage.dataTable.dataSourceFilter;
            data.forEach((itrDataNew) => {
              listData.push(itrDataNew);
            });

            dataPage.dataTable.dataSourceFilter = listData;
          }
        }
        break;
    }

    dataPage.refresh = data.length !== 0;

    this.tableInformationService.refreshTable$.emit({
      data: dataPage.dataTable,
      name: nameTable,
      opc,
    });

    return dataPage;
  }

  paginatorManual(list: any[], pageSize: number, pageIndex: number): any[] {
    const newList: any[] = [];
    const start: number = pageSize * pageIndex;
    const end: number = pageSize * (pageIndex + 1);

    for (let index = start; index < end; index++) {
      if (index < list.length) newList.push(list[index]);
    }

    return newList;
  }
}
