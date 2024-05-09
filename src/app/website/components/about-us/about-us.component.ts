import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

import {
  CryptoService,
  HttpService,
  LocalStorageService,
  NavegationService,
  ShareInformationService,
  WindowSizeService,
} from '@core/services';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit, AfterViewInit, OnDestroy {
  menuList: any;
  listSubscription: Subscription[];

  constructor(
    private objRouter: Router,
    private title: Title,
    private meta: Meta,
    private objSnackBar: MatSnackBar,
    private objHttpService: HttpService,
    private objLocalStorageService: LocalStorageService,
    private objCryptoService: CryptoService,
    private objShareInformationService: ShareInformationService,
    private objWindowSizeService: WindowSizeService,
    public objNavegationService: NavegationService,
  ) {
    this.menuList = [
      {
        title: 'Quienes somos',
        status: false,
        description:
          'Soluciones Comerciales hidráulicas Pereira S de RL es una empresa mexicana que cuenta con la distribución de la marca medidores Itron y accesorios hidráulicos marca ALFA dedicas a la comercialización e innovación de productos y sistemas de medición de agua, siempre en búsqueda de alternativas que ayuden eficientemente a mejorar la administración y gestión del agua. Nuestras soluciones ayudan a concesionarias de agua Potable en México, empresas públicas y privadas, industrias, fabricas, ferreteras, micronegocios, proyectos y a los pequeños emprendedores.',
      },
      {
        title: 'Nuestra Misión',
        status: false,
        description:
          'Ofrecer las mejores soluciones en medición de agua a nuestros clientes para que adquieran una mayor seguridad y un mejor control en la gestión del agua, diagnosticando las necesidades y condiciones propias de cada uno de nuestro cliente con el fin de maximizar los beneficios para nuestros clientes y optimicen la distribución, conservación y uso del recurso.',
      },
      {
        title: 'Nuestra Visón',
        status: false,
        description:
          'Ser la empresa líder en nuestro mercado satisfaciendo a nuestros clientes con nuestra amplia cartera de productos y servicios, por supuesto dando soluciones innovadoras, eficientes y de gran calidad basadas en tecnologías a través de nuevas alianzas estratégicas de nuestros proveedores.',
      },
    ];

    this.listSubscription = [new Subscription(), new Subscription()];
  }

  ngOnInit(): void {
    this.title.setTitle('SCHP | Acerca de nosotros');
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

    this.listSubscription[1] =
      this.objShareInformationService.search3$.subscribe((response: string) => {
        this.objLocalStorageService.save(
          'selpro',
          this.objCryptoService.encrypted(response),
        );
        this.objNavegationService.navegatePage('Product/List');
      });
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  ngAfterViewInit() {
    setTimeout(
      () => this.objNavegationService.currentSelectMenu(this.objRouter.url),
      100,
    );
  }
}
