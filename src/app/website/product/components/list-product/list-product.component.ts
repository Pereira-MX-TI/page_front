import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import {
  CryptoService,
  HttpService,
  LocalStorageService,
  NavegationService,
  ShareInformationService,
  WindowSizeService,
} from '@core/services';
import { ProductPipe } from '@website/product/pipes/product.pipe';
import { ModalProductComponent } from '@website/product/components';

@Component({
  selector: 'list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pagGeneral') paginator!: MatPaginator;
  //@ViewChild('contGeneral') container!: ElementRef;

  listSubscription: Subscription[];
  length: number;

  objKeepViewWindow: any;
  dataSearch: string;
  displayedColumns: string[];
  listColumns: any;
  pipeProduct: ProductPipe;
  dataSourceFilter: MatTableDataSource<any>;
  orderby: string;
  filters: any;

  constructor(
    private title: Title,
    private meta: Meta,
    public dialog: MatDialog,
    private objRouter: Router,
    private objSnackBar: MatSnackBar,
    private objHttpService: HttpService,
    private objLocalStorageService: LocalStorageService,
    private objCryptoService: CryptoService,
    private objShareInformationService: ShareInformationService,
    private objWindowSizeService: WindowSizeService,
    public objNavegationService: NavegationService,
  ) {
    this.length = 0;
    this.pipeProduct = new ProductPipe();
    this.dataSourceFilter = new MatTableDataSource<any>([]);
    this.listSubscription = [new Subscription(), new Subscription()];

    this.dataSearch = '';
    this.orderby = 'ASC';
    this.filters = { brands: [], materials: [], categories: [] };

    this.displayedColumns = ['image', 'description'];
    this.listColumns = { image: '', description: 'DESCRIPTION' };

    this.objKeepViewWindow = {
      opc: 1,
      pageIndex: 0,
      offset: 0,
      search: '',
      pageSize: this.objWindowSizeService.checkMaxScreenSize(767) ? 35 : 25,
      limit: this.objWindowSizeService.checkMaxScreenSize(767) ? 35 : 25,
      scrollPosition: 0,
      orderby: this.orderby,
    };
  }

  ngOnInit(): void {
    this.title.setTitle('SCHP | Productos');
    this.meta.updateTag({ name: 'title', content: 'Medidores de agua' });
    this.meta.updateTag({
      name: 'description',
      content:
        'medidores de agua, como instalar medidores de agua, medidores de agua precio, medidores de agua potable, medidores de agua internos, medidor para agua Puebla, instalacion de medidor para agua Puebla, Venta de medidor para agua Puebla, Accesorios para medidor para agua Puebla, telemetria para medidor para agua, instalacion de medidores de agua en edificios, soluciones jmpf, instalacion de medidores de agua potable, costo instalacion de medidor de agua, proyecto de instalacion de medidores de agua, conexion para medidor de agua, cuadro de medidor de agua, programa de instalacion de medidores de agua, norma de instalacion de medidores de agua, instalar medidores de agua, instalacion de medidores de agua, costo por instalacion de medidor de agua, instalacion de medidor de flujo de agua, precio de instalacion de medidor de agua, instalacion del medidor de agua, normas para la instalacion de medidores de agua, cuanto cuesta la instalacion de un medidor de agua',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'medidores de agua, como instalar medidores de agua, medidores de agua precio, medidores de agua potable, medidores de agua internos, medidor para agua Puebla, instalacion de medidor para agua Puebla, Venta de medidor para agua Puebla, Accesorios para medidor para agua Puebla, telemetria para medidor para agua, instalacion de medidores de agua en edificios, soluciones jmpf, instalacion de medidores de agua potable, costo instalacion de medidor de agua, proyecto de instalacion de medidores de agua, conexion para medidor de agua, cuadro de medidor de agua, programa de instalacion de medidores de agua, norma de instalacion de medidores de agua, instalar medidores de agua, instalacion de medidores de agua, costo por instalacion de medidor de agua, instalacion de medidor de flujo de agua, precio de instalacion de medidor de agua, instalacion del medidor de agua, normas para la instalacion de medidores de agua, cuanto cuesta la instalacion de un medidor de agua',
    });
    this.meta.updateTag({
      name: 'site',
      content: 'https://solucionesjmpf.com',
    });

    if (this.objLocalStorageService.exist('cwlpro')) {
      this.objKeepViewWindow = this.objCryptoService.decrypted(
        this.objLocalStorageService.view('cwlpro'),
      );
      this.objLocalStorageService.remove(['cwlpro']);

      this.orderby = this.objKeepViewWindow.orderby;
      this.dataSearch = this.objKeepViewWindow.search;

      //SE MODIFICA EL LIMITE PARA OBTENCION DE LA CANTIDAD DE REGISTROS SOLICITADOS POR PRIMER LLENADO DE TABLA
      if (this.objWindowSizeService.checkMaxScreenSize(767)) {
        this.objKeepViewWindow.offset = 0;
        this.objKeepViewWindow.limit = this.objKeepViewWindow.pageSize;
      }
    }

    if (this.objLocalStorageService.exist('selpro')) {
      this.dataSearch = this.objCryptoService.decrypted(
        this.objLocalStorageService.view('selpro'),
      );
      this.objKeepViewWindow.search = this.dataSearch;
      this.objLocalStorageService.remove(['selpro']);
      this.objNavegationService.setPositionScrooll(0);
    }

    this.fillTableFirsTime();
    this.listSubscription[1] =
      this.objShareInformationService.search3$.subscribe((response: string) => {
        this.dataSearch = response;
        this.searchProduct();
      });
  }

  ngAfterViewInit() {
    this.paginator._intl.nextPageLabel = '';
    this.paginator._intl.previousPageLabel = '';
    this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';

    setTimeout(
      () => this.objNavegationService.currentSelectMenu(this.objRouter.url),
      100,
    );
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  fillTableFirsTime() {
    this.objShareInformationService.viewLoading$.emit(true);
    if (this.objKeepViewWindow.search == '') {
      this.objHttpService
        .getListProduct({
          opc: this.objKeepViewWindow.opc,
          offset: this.objKeepViewWindow.offset,
          limit: this.objKeepViewWindow.limit,
          filters: 1,
          quantity: 1,
          orderby: this.objKeepViewWindow.orderby,
        })
        .subscribe(
          (res) => {
            let data: any = this.objCryptoService.decrypted(res['data']);
            this.filters = data.filters;

            this.dataSourceFill(
              data.list,
              this.objWindowSizeService.checkMaxScreenSize(767) ? 1 : 0,
            );
            this.keepPaginator(data.quantity);
            this.objShareInformationService.viewLoading$.emit(false);
          },
          (err) => {
            this.objShareInformationService.viewLoading$.emit(false);
            this.objSnackBar.open('Error obtener lista productos', null, {
              duration: 2500,
              panelClass: ['snackBar_error'],
            });
          },
        );
    } else {
      this.objHttpService
        .searchListProduct({
          opc: this.objKeepViewWindow.opc,
          search: this.objKeepViewWindow.search,
          offset: this.objKeepViewWindow.offset,
          limit: this.objKeepViewWindow.limit,
          quantity: 1,
          filters: 1,
          orderby: this.objKeepViewWindow.orderby,
        })
        .subscribe(
          (res) => {
            let data: any = this.objCryptoService.decrypted(res['data']);
            this.filters = data.filters;

            this.dataSourceFill(
              data.list,
              this.objWindowSizeService.checkMaxScreenSize(767) ? 1 : 0,
            );
            this.keepPaginator(data.quantity);
            this.objShareInformationService.viewLoading$.emit(false);
          },
          (err) => {
            this.objShareInformationService.viewLoading$.emit(false);
            this.objSnackBar.open('Error obtener lista productos', null, {
              duration: 2500,
              panelClass: ['snackBar_error'],
            });
          },
        );
    }
  }

  keepPaginator(quantity: number): void {
    setTimeout(() => {
      this.paginator.pageIndex = this.objKeepViewWindow.pageIndex;
      this.paginator.pageSize = this.objKeepViewWindow.pageSize;
      this.objNavegationService.setPositionScrooll(
        this.objKeepViewWindow.scrollPosition,
      );
    }, 10);

    this.length = quantity;
    this.paginator._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number,
    ) => {
      const start = page * pageSize + 1;
      const end =
        (page + 1) * pageSize > length ? length : (page + 1) * pageSize;
      return `${start} - ${end} of ${length}`;
    };
  }

  dataSourceFill(data: any[], opcFill: number): void {
    switch (opcFill) {
      case 0:
        this.dataSourceFilter = new MatTableDataSource<any>(data);
        break;
      case 1:
        {
          this.dataSourceFilter = new MatTableDataSource<any>(data);
          this.objKeepViewWindow.offset = this.objKeepViewWindow.pageSize;
          this.objKeepViewWindow.limit =
            this.objWindowSizeService.checkMaxScreenSize(767) ? 35 : 25;
        }
        break;
      case 2:
        {
          if (data.length != 0) {
            //VALIDA SI LA RESPUESTA CONTIENE MAS REGISTROS PARA ACTUALIZAR LOS PARAMETROS DEL PAGINADOR
            this.objKeepViewWindow.pageSize += 35;
            this.objKeepViewWindow.offset += 35;
            this.paginator.pageSize = this.objKeepViewWindow.pageSize;

            let listProduct: any[] = this.dataSourceFilter.filteredData;
            data.forEach((itrNew) => {
              listProduct.push(itrNew);
            });

            this.dataSourceFilter = new MatTableDataSource<any>(listProduct);
          }
        }
        break;
    }
  }

  changePagination(event: PageEvent): void {
    this.objNavegationService.setPositionScrooll(0);
    this.objShareInformationService.viewLoading$.emit(true);

    this.objKeepViewWindow = {
      opc: this.objKeepViewWindow.opc,
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
      limit: event.pageSize,
      offset: event.pageIndex * event.pageSize,
      search: this.dataSearch,
    };

    if (this.dataSearch == '') {
      this.objHttpService
        .getListProduct({
          opc: this.objKeepViewWindow.opc,
          offset: this.objKeepViewWindow.offset,
          limit: this.objKeepViewWindow.limit,
          filters: 0,
          quantity: 0,
          orderby: this.orderby,
        })
        .subscribe(
          (res) => {
            this.dataSourceFill(
              this.objCryptoService.decrypted(res['data']).list,
              0,
            );
            this.objShareInformationService.viewLoading$.emit(false);
          },
          (err) => {
            this.objShareInformationService.viewLoading$.emit(false);
            this.objSnackBar.open('Error obtener lista productos', null, {
              duration: 2500,
              panelClass: ['snackBar_error'],
            });
          },
        );
    } else {
      this.objHttpService
        .searchListProduct({
          opc: this.objKeepViewWindow.opc,
          search: this.objKeepViewWindow.search,
          offset: this.objKeepViewWindow.offset,
          limit: this.objKeepViewWindow.limit,
          quantity: 0,
          filters: 0,
          orderby: this.orderby,
        })
        .subscribe(
          (res) => {
            this.dataSourceFill(
              this.objCryptoService.decrypted(res.data).list,
              0,
            );
            this.objShareInformationService.viewLoading$.emit(false);
          },
          (err) => {
            this.objSnackBar.open('Error en busqueda producto', '', {
              duration: 2500,
              panelClass: ['snackBar_error'],
            });
            this.objShareInformationService.viewLoading$.emit(false);
          },
        );
    }
  }

  viewMoreFilter(opcFilter: number): void {
    const dialogRef = this.dialog.open(ModalProductComponent, {
      closeOnNavigation: true,
      autoFocus: false,
      data: { opcFilter: opcFilter, filters: this.filters, opcView: 0 },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response != undefined && response != null && response) {
        this.filterProduct(opcFilter, response);
      }
    });
  }

  searchProduct(): void {
    this.objShareInformationService.viewLoading$.emit(true);
    this.objNavegationService.setPositionScrooll(0);

    this.objKeepViewWindow = {
      opc: 1,
      pageIndex: 0,
      pageSize: this.objWindowSizeService.checkMaxScreenSize(767) ? 35 : 25,
      limit: this.objWindowSizeService.checkMaxScreenSize(767) ? 35 : 25,
      offset: 0,
      search: this.dataSearch,
    };

    this.objHttpService
      .searchListProduct({
        opc: this.objKeepViewWindow.opc,
        search: this.objKeepViewWindow.search,
        offset: this.objKeepViewWindow.offset,
        limit: this.objKeepViewWindow.limit,
        quantity: 1,
        filters: 0,
        orderby: this.orderby,
      })
      .subscribe(
        (res) => {
          let data: any = this.objCryptoService.decrypted(res['data']);

          this.dataSourceFill(
            data.list,
            this.objWindowSizeService.checkMaxScreenSize(767) ? 1 : 0,
          );
          this.keepPaginator(data.quantity);
          this.objShareInformationService.viewLoading$.emit(false);
        },
        (err) => {
          this.objShareInformationService.viewLoading$.emit(false);
          this.objSnackBar.open('Error obtener lista productos', null, {
            duration: 2500,
            panelClass: ['snackBar_error'],
          });
        },
      );
  }

  filterProduct(opcFilter: number, data: any): void {
    this.objShareInformationService.viewLoading$.emit(true);
    this.dataSearch = data.nombre;
    this.objNavegationService.setPositionScrooll(0);

    this.objKeepViewWindow = {
      opc: opcFilter,
      pageIndex: 0,
      pageSize: this.objWindowSizeService.checkMaxScreenSize(767) ? 35 : 25,
      limit: this.objWindowSizeService.checkMaxScreenSize(767) ? 35 : 25,
      offset: 0,
      search: this.dataSearch,
    };

    this.objHttpService
      .searchListProduct({
        opc: this.objKeepViewWindow.opc,
        search: this.objKeepViewWindow.search,
        offset: this.objKeepViewWindow.offset,
        limit: this.objKeepViewWindow.limit,
        quantity: 1,
        filters: 0,
        orderby: this.orderby,
      })
      .subscribe(
        (res) => {
          let data: any = this.objCryptoService.decrypted(res['data']);

          this.dataSourceFill(
            data.list,
            this.objWindowSizeService.checkMaxScreenSize(767) ? 1 : 0,
          );
          this.keepPaginator(data.quantity);
          this.objShareInformationService.viewLoading$.emit(false);
        },
        (err) => {
          this.objShareInformationService.viewLoading$.emit(false);
          this.objSnackBar.open('Error obtener lista productos', null, {
            duration: 2500,
            panelClass: ['snackBar_error'],
          });
        },
      );
  }

  filterProductModal(): void {
    const dialogRef = this.dialog.open(ModalProductComponent, {
      panelClass: 'filter',
      width: '100vw',
      maxWidth: '100vw',
      position: { top: '0', left: '0' },
      closeOnNavigation: true,
      autoFocus: false,
      data: { filters: this.filters, opcView: 1 },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response != undefined && response != null && response) {
        this.filterProduct(response['opcFilter'], response['data']);
      }
    });
  }

  orderByProduct(): void {
    this.objShareInformationService.viewLoading$.emit(true);
    this.objNavegationService.setPositionScrooll(0);
    this.orderby = this.orderby == 'ASC' ? 'DESC' : 'ASC';

    if (this.dataSearch == '') {
      this.objHttpService
        .getListProduct({
          opc: this.objKeepViewWindow.opc,
          offset:
            this.objKeepViewWindow.pageIndex == 0
              ? 0
              : this.objKeepViewWindow.offset,
          limit: this.objKeepViewWindow.limit,
          filters: 0,
          quantity: 1,
          orderby: this.orderby,
        })
        .subscribe(
          (res) => {
            let data: any = this.objCryptoService.decrypted(res['data']);
            this.dataSourceFill(
              data.list,
              this.objWindowSizeService.checkMaxScreenSize(767) ? 1 : 0,
            );
            this.keepPaginator(data.quantity);
            this.objShareInformationService.viewLoading$.emit(false);
          },
          (err) => {
            this.objShareInformationService.viewLoading$.emit(false);
            this.objSnackBar.open('Error obtener lista productos', null, {
              duration: 2500,
              panelClass: ['snackBar_error'],
            });
          },
        );
    } else {
      this.objHttpService
        .searchListProduct({
          opc: this.objKeepViewWindow.opc,
          search: this.objKeepViewWindow.search,
          offset:
            this.objKeepViewWindow.pageIndex == 0
              ? 0
              : this.objKeepViewWindow.offset,
          limit: this.objKeepViewWindow.limit,
          quantity: 1,
          filters: 0,
          orderby: this.orderby,
        })
        .subscribe(
          (res) => {
            let data: any = this.objCryptoService.decrypted(res['data']);

            this.dataSourceFill(
              data.list,
              this.objWindowSizeService.checkMaxScreenSize(767) ? 1 : 0,
            );
            this.keepPaginator(data.quantity);
            this.objShareInformationService.viewLoading$.emit(false);
          },
          (err) => {
            this.objShareInformationService.viewLoading$.emit(false);
            this.objSnackBar.open('Error obtener lista productos', null, {
              duration: 2500,
              panelClass: ['snackBar_error'],
            });
          },
        );
    }
  }

  refresh(): void {
    this.objShareInformationService.viewLoading$.emit(true);
    this.dataSearch = '';

    this.objKeepViewWindow = {
      opc: 1,
      pageIndex: 0,
      offset: 0,
      search: '',
      pageSize: this.objWindowSizeService.checkMaxScreenSize(767) ? 35 : 25,
      limit: this.objWindowSizeService.checkMaxScreenSize(767) ? 35 : 25,
      orderby: this.orderby,
    };

    this.objHttpService
      .getListProduct({
        opc: this.objKeepViewWindow.opc,
        offset: this.objKeepViewWindow.offset,
        limit: this.objKeepViewWindow.limit,
        filters: 1,
        quantity: 1,
        orderby: this.orderby,
      })
      .subscribe(
        (res) => {
          let data: any = this.objCryptoService.decrypted(res['data']);
          this.filters = data.filters;

          this.dataSourceFill(
            data.list,
            this.objWindowSizeService.checkMaxScreenSize(767) ? 1 : 0,
          );
          this.keepPaginator(data.quantity);
          this.objShareInformationService.viewLoading$.emit(false);
        },
        (err) => {
          this.objShareInformationService.viewLoading$.emit(false);
          this.objSnackBar.open('Error obtener lista productos', null, {
            duration: 2500,
            panelClass: ['snackBar_error'],
          });
        },
      );
  }

  viewProduct(product: any): void {
    this.objKeepViewWindow.orderby = this.orderby;
    this.objKeepViewWindow.scrollPosition =
      this.objNavegationService.getPositionScrooll();

    this.objLocalStorageService.save(
      'cwlpro',
      this.objCryptoService.encrypted(this.objKeepViewWindow),
    );
    this.objNavegationService.navegatePage(
      '/Product/View/' +
        btoa(this.objCryptoService.encrypted(product)).replace(
          new RegExp('/', 'g'),
          '~',
        ),
    );
  }
}
