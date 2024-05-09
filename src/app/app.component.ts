import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs/operators';

import {
  CheckReloadService,
  CryptoService,
  HttpService,
  LocalStorageService,
  NavegationService,
  ShareInformationService,
} from '@core/services';
import { ModalDialogComponent } from '@website/shared/components';
import { environment } from 'src/environments/environment';

declare var gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('tabSearch', { static: true }) tabSearch: any;
  @ViewChild('sideNav', { static: true }) sideNav: any;
  @ViewChild('contGeneral') container!: ElementRef;

  listOption: boolean[];
  sideNavMenu: boolean;
  matTabMenu: number;
  viewMenu: boolean;
  listSubscription: Subscription[];
  formControl: UntypedFormControl;

  constructor(
    private title: Title,
    private meta: Meta,
    private objRouter: Router,
    public dialog: MatDialog,
    private objSnackBar: MatSnackBar,
    private objHttpService: HttpService,
    private objCheckReloadService: CheckReloadService,
    private objLocalStorageService: LocalStorageService,
    private objCryptoService: CryptoService,
    private objNavegationService: NavegationService,
    private objShareInformationService: ShareInformationService,
  ) {
    this.formControl = new UntypedFormControl();
    this.formControl.setValue('');
    this.matTabMenu = 0;
    this.sideNavMenu = false;
    this.objCheckReloadService.check();
    this.listOption = this.objNavegationService.listSelectMenu(
      this.objRouter.url,
    )[0];
    this.listSubscription = [
      new Subscription(),
      new Subscription(),
      new Subscription(),
      new Subscription(),
    ];

    //    ;

    const navEvents$ = this.objRouter.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    );

    navEvents$.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-175222693-1', {
        page_path: event.urlAfterRedirects,
      });
    });
  }

  ngOnInit(): void {
    this.title.setTitle('SCHP | Medidores para agua');
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

    this.listSubscription[0] =
      this.objShareInformationService.viewSideNav$.subscribe(
        (status: boolean) => {
          this.sideNavMenu = status;
        },
      );
    this.listSubscription[1] =
      this.objShareInformationService.selectMenuMovil$.subscribe(
        (response: boolean[]) => {
          this.listOption = response;
        },
      );

    this.listSubscription[3] =
      this.objShareInformationService.search1$.subscribe((response: string) => {
        this.formControl.setValue(response);
      });

    this.formControl.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => {}),
        switchMap((value) =>
          this.objHttpService
            .autoCompletedProduct({ word: value == '' ? '~' : value, opc: 0 })
            .pipe(finalize(() => {})),
        ),
      )
      .subscribe((res) => {
        if (res['data']) {
          let data: any = this.objCryptoService.decrypted(res['data']).list;
          let listAutocompleted: string[] = Object.keys(data).map(
            function (itr) {
              return data[itr];
            },
          );
          this.objShareInformationService.search2$.emit(listAutocompleted);
        }
      });

    this.getIpAddress();
    // this.getAccountVisit();

    setTimeout(() => {
      if (this.objLocalStorageService.exist('vieMoPub')) {
        let datePublicity: Date = new Date(
          this.objCryptoService.decrypted(
            this.objLocalStorageService.view('vieMoPub'),
          ),
        );
        datePublicity.setHours(datePublicity.getHours() + 1);

        if (datePublicity.getTime() < new Date().getTime()) {
          this.objLocalStorageService.save(
            'vieMoPub',
            this.objCryptoService.encrypted(new Date()),
          );
          this.dialog.open(ModalDialogComponent, {
            closeOnNavigation: true,
            autoFocus: false,
            data: { opcView: 2 },
          });
        }
      } else {
        this.objLocalStorageService.save(
          'vieMoPub',
          this.objCryptoService.encrypted(new Date()),
        );
        this.dialog.open(ModalDialogComponent, {
          closeOnNavigation: true,
          autoFocus: false,
          data: { opcView: 2 },
        });
      }
    }, 2000);
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  changeViewMenuMovil(opcTabMenu: number): void {
    this.matTabMenu = opcTabMenu;
    this.tabSearch._indexToSelect = this.matTabMenu;
  }

  changeStatusSideNav(status: boolean): void {
    this.sideNavMenu = status;
  }

  navegate(url: string) {
    this.objNavegationService.viewSideNav(false);
    this.objNavegationService.navegatePage(url);
  }

  getAccountVisit(): void {
    this.objHttpService
      .getLogin({
        email: environment.USEREMAIL,
        password: environment.USERPASS,
        device: navigator.userAgent,
      })
      .subscribe(
        (res) => {
          // console.log(this.objCryptoService.decrypted(res["data"]));
        },
        (err) => {
          this.objSnackBar.open('Error en token', null, {
            duration: 2500,
            panelClass: ['snackBar_error'],
          });
        },
      );
  }

  getIpAddress(): void {
    this.objHttpService.getIpAddress().subscribe(
      (res) => {
        this.objLocalStorageService.save(
          'adip',
          this.objCryptoService.encrypted(res),
        );
      },
      (err) => {},
    );
  }
}
