import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'

import { NavegationService } from '@services/navegation/navegation.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CryptoService } from '../../../services/crypto/crypto.service'
import { Subscription } from 'rxjs'
import { ShareInformationService } from '@services/share-information/share-information.service'
import { WindowSizeService } from '@services/window-size/window-size.service'
import { LocalStorageService } from '@services/local-storage/local-storage.service'
import { HttpService } from '@services/http/http.service'
import { Meta, Title } from '@angular/platform-browser'

@Component({
  selector: 'app-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css'],
})
export class ListServiceComponent implements OnInit, AfterViewInit, OnDestroy {
  listSubscription: Subscription[]
  listData: any

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
    this.listSubscription = [new Subscription(), new Subscription()]
    this.listData = [
      [
        {
          opc: 0,
          icon: './../../../../assets/servicio_04.jpg',
          title: 'Telemetría',
          list: [
            'Toma de lectura diaria.',
            'Reduccion de costos.',
            'Geolocalizacion.',
            'Antifraude.',
            'Visualizacion de datos de forma movil.',
            'Entre otros.',
          ],
        },
        {
          opc: 1,
          icon: './../../../../assets/servicio_01.jpg',
          title: 'Detección de fugas',
          list: [
            'Velocidad y seguridad.',
            'Deteccion sin boqueteo',
            'Tecnología electro geófono',
            'Detección de fugas silenciosas',
            'Reduccion de tiempo operativo',
            'Entre otros.',
          ],
        },
        {
          opc: 2,
          icon: './../../../../assets/servicio_03.jpg',
          title: 'Instalación de medidor de agua',
          list: [
            'Calidad y garantía.',
            'Experiencia de 20 años',
            'Adecuacion de toma',
            'Construccion de cuadro del medidor',
            'Instalacion de caja de banqueta',
            'Entre otros.',
          ],
        },
      ],
    ]
  }

  ngOnInit(): void {
    this.title.setTitle('SCHP | Servicios')
    this.meta.updateTag({ name: 'title', content: 'Medidores de agua' })
    this.meta.updateTag({
      name: 'description',
      content:
        'medidores de agua, como instalar medidores de agua, medidores de agua precio, medidores de agua potable, medidores de agua internos, medidor para agua Puebla, instalacion de medidor para agua Puebla, Venta de medidor para agua Puebla, Accesorios para medidor para agua Puebla, telemetria para medidor para agua, instalacion de medidores de agua en edificios, soluciones jmpf, instalacion de medidores de agua potable, costo instalacion de medidor de agua, proyecto de instalacion de medidores de agua, conexion para medidor de agua, cuadro de medidor de agua, programa de instalacion de medidores de agua, norma de instalacion de medidores de agua, instalar medidores de agua, instalacion de medidores de agua, costo por instalacion de medidor de agua, instalacion de medidor de flujo de agua, precio de instalacion de medidor de agua, instalacion del medidor de agua, normas para la instalacion de medidores de agua, cuanto cuesta la instalacion de un medidor de agua',
    })
    this.meta.updateTag({
      name: 'keywords',
      content:
        'medidores de agua, como instalar medidores de agua, medidores de agua precio, medidores de agua potable, medidores de agua internos, medidor para agua Puebla, instalacion de medidor para agua Puebla, Venta de medidor para agua Puebla, Accesorios para medidor para agua Puebla, telemetria para medidor para agua, instalacion de medidores de agua en edificios, soluciones jmpf, instalacion de medidores de agua potable, costo instalacion de medidor de agua, proyecto de instalacion de medidores de agua, conexion para medidor de agua, cuadro de medidor de agua, programa de instalacion de medidores de agua, norma de instalacion de medidores de agua, instalar medidores de agua, instalacion de medidores de agua, costo por instalacion de medidor de agua, instalacion de medidor de flujo de agua, precio de instalacion de medidor de agua, instalacion del medidor de agua, normas para la instalacion de medidores de agua, cuanto cuesta la instalacion de un medidor de agua',
    })
    this.meta.updateTag({ name: 'site', content: 'https://solucionesjmpf.com' })

    this.objNavegationService.setPositionScrooll(0)

    this.listSubscription[1] =
      this.objShareInformationService.search3$.subscribe((response: string) => {
        this.objLocalStorageService.save(
          'selpro',
          this.objCryptoService.encrypted(response),
        )
        this.objNavegationService.navegatePage('Product/List')
      })
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe()
    })
  }

  ngAfterViewInit() {
    setTimeout(
      () => this.objNavegationService.currentSelectMenu(this.objRouter.url),
      100,
    )
  }

  viewService(service: number): void {
    this.objNavegationService.navegatePage(
      '/Service/View/' +
        btoa(this.objCryptoService.encrypted({ service: service })).replace(
          new RegExp('/', 'g'),
          '~',
        ),
    )
  }
}
