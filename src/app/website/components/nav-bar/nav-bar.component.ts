import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import {
  CryptoService,
  LocalStorageService,
  NavegationService,
  ShareInformationService,
  WindowSizeService,
} from '@core/services';
import { ModalDialogComponent } from '@website/shared/components';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Output('sideNavMenuChange') sideNavMenuChange = new EventEmitter();
  @Output('matTabMenuChange') matTabMenuChange = new EventEmitter();

  @ViewChild('tabNavBar', { static: true }) tabNavBar: any;
  @ViewChild('btnReturn', { static: true }) btnReturn: MatButton;

  @ViewChild('clickMenuTrigger', { static: false }) menuAccount: MatMenuTrigger;
  @ViewChild('hoverMenuTriggerRead') hoverMenuTriggerRead!: MatMenuTrigger;

  viewMenu: boolean[];
  viewModule: boolean[];
  listOption: boolean[];

  keyword: string;
  matTabMenu: number;
  timedOutCloser: any;

  title: string;
  icon: string;
  viewBtn: boolean[];
  formControl: UntypedFormControl;
  listObservable: any;
  listSubscription: Subscription[];
  shoppingCar: any[];

  public constructor(
    public dialog: MatDialog,
    private objLocalStorageService: LocalStorageService,
    public objNavegationService: NavegationService,
    private objShareInformationService: ShareInformationService,
    private objRouter: Router,
    private objRouteActivated: ActivatedRoute,
    private objCryptoService: CryptoService,
    private objWindowSizeService: WindowSizeService,
  ) {
    this.listSubscription = [
      new Subscription(),
      new Subscription(),
      new Subscription(),
    ];
    this.shoppingCar = [];
    this.keyword = '';
    this.viewMenu = [false, false];
    this.viewBtn = [false, false];
    this.formControl = new UntypedFormControl();

    this.formControl.setValue('');
    this.listObservable = [];

    this.listOption = this.objNavegationService.listSelectMenu(
      objRouter.url,
    )[0];
  }

  ngOnInit(): void {
    if (this.objLocalStorageService.exist('shCa'))
      this.shoppingCar = this.objCryptoService.decrypted(
        this.objLocalStorageService.view('shCa'),
      );

    this.listSubscription[0] =
      this.objShareInformationService.search2$.subscribe(
        (response: string[]) => {
          this.listObservable = response;
        },
      );

    this.listSubscription[1] =
      this.objShareInformationService.selectMenuMovil$.subscribe(
        (response: boolean[]) => {
          this.listOption = response;
        },
      );

    this.listSubscription[2] =
      this.objShareInformationService.manageCarShopping$.subscribe(
        (response: any) => {
          this.manageShoppingCar(response.data, response.opc);
        },
      );
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  closeAccount(): void {
    this.objRouter.navigate(['/Auth/Login']);
  }

  openMenuAccount(): void {
    if (this.objWindowSizeService.checkMaxScreenSize(479)) {
      this.matTabMenu = this.matTabMenu == 0 ? 1 : 0;
      this.matTabMenuChange.emit(this.matTabMenu);
    }
  }

  openSideNav(opcSideNav: number): void {
    switch (opcSideNav) {
      case 0:
        {
          this.sideNavMenuChange.emit(true);
        }
        break;
    }
  }

  closeMenu(): void {
    if (this.hoverMenuTriggerRead) this.hoverMenuTriggerRead.closeMenu();
  }

  mouseEnter(trigger: any, opcMenu: number): void {
    switch (opcMenu) {
      case 0:
        this.hoverMenuTriggerRead.closeMenu();
        break;
    }

    if (this.timedOutCloser) clearTimeout(this.timedOutCloser);

    trigger.openMenu();
  }

  mouseLeave(trigger: any): void {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 50);
  }

  returnWindow(): void {
    this.icon = 'keyboard_backspace';
    let urlCurrent = this.objRouter.url;

    urlCurrent = urlCurrent.includes('/DashBoard/Admin/Read/Consumption/Detail')
      ? '/DashBoard/Admin/Read/Consumption/Detail'
      : urlCurrent;
    urlCurrent = urlCurrent.includes('/DashBoard/Admin/Read/Schedule/Detail')
      ? '/DashBoard/Admin/Read/Schedule/Detail'
      : urlCurrent;

    switch (urlCurrent) {
      case '/DashBoard/Admin/RegisterRoute':
        {
        }
        break;
    }
  }

  autoCompleted(): void {
    if (this.formControl.value == '') this.listObservable = [];
    else {
      this.objShareInformationService.search1$.emit(this.formControl.value);
    }
  }

  applySearch(): void {
    if (this.objWindowSizeService.checkMinScreenSize(767)) {
      if (this.formControl.value == '') this.listObservable = [];
      else {
        this.objShareInformationService.viewLoading$.emit(true);
        this.objShareInformationService.search3$.emit(this.formControl.value);
      }
    } else {
      this.dialog.open(ModalDialogComponent, {
        panelClass: 'search',
        width: '100vw',
        maxWidth: '100vw',
        position: { top: '0', left: '0' },
        closeOnNavigation: true,
        autoFocus: false,
        data: { opcView: 1 },
      });
    }
  }

  openMoreVert(): void {
    this.objShareInformationService.openMoreVert$.emit();
  }

  manageShoppingCar(data: any, opc: number): void {
    switch (opc) {
      case 0:
        {
          let insert: boolean = true;
          for (let itr = 0; itr < this.shoppingCar.length; itr++)
            if (this.shoppingCar[itr].product.id == data.product.id) {
              this.shoppingCar[itr].quantity += data.quantity;
              insert = false;
              break;
            }

          if (insert) this.shoppingCar.push(data);
        }
        break;

      case 1:
        this.shoppingCar = data;
        break;
      case 2:
        this.shoppingCar = [];
        break;
    }

    this.objLocalStorageService.save(
      'shCa',
      this.objCryptoService.encrypted(this.shoppingCar),
    );
  }

  navegateUrl(url: string): void {
    this.objNavegationService.navegatePage(url);
  }
}
