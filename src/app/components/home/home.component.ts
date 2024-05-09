import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core'
import { HttpService } from '@services/http/http.service'
import { LocalStorageService } from '@services/local-storage/local-storage.service'
import { WindowSizeService } from '@services/window-size/window-size.service'

import AOS from 'aos'
import { NavegationService } from '@services/navegation/navegation.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CryptoService } from '../../services/crypto/crypto.service'
import { Subscription } from 'rxjs'
import { ShareInformationService } from '@services/share-information/share-information.service'
import { Meta, Title } from '@angular/platform-browser'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  countColumn: number[]
  sizeRow: string

  panelOpenState: boolean
  messageBtnFooter: string

  gridService: any
  dataCarousel: any
  listSubscription: Subscription[]

  constructor(
    private title: Title,
    private meta: Meta,
    private objRouter: Router,
    private renderer: Renderer2,
    private objSnackBar: MatSnackBar,
    private objHttpService: HttpService,
    private objLocalStorageService: LocalStorageService,
    private objCryptoService: CryptoService,
    private objShareInformationService: ShareInformationService,
    private objWindowSizeService: WindowSizeService,
    public objNavegationService: NavegationService,
  ) {
    this.countColumn = [0, 0]
    this.gridService = [
      { cols: 2, rows: 1 },
      { cols: 2, rows: 2 },
      { cols: 3, rows: 1 },
      { cols: 1, rows: 1 },
      { cols: 2, rows: 1 },
      { cols: 2, rows: 1 },
      { cols: 1, rows: 1 },
      { cols: 1, rows: 1 },
    ]

    this.objLocalStorageService.remove(['cwlpro'])
    this.dataCarousel = [{ details: [] }, { details: [] }, { details: [] }]
    this.panelOpenState = false
    this.messageBtnFooter = 'Mas informacion'
    this.listSubscription = [new Subscription(), new Subscription()]
  }

  ngOnInit(): void {
    this.title.setTitle('SCHP | Inicio')
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

    AOS.init()
    this.redimensionComponent()
    this.renderer.listen(window, 'resize', () => {
      this.redimensionComponent()
    })
    this.refresh()

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

  redimensionComponent(): void {
    if (this.objWindowSizeService.checkMaxScreenSize(800)) {
      this.gridService = [
        { cols: 1, rows: 1 },
        { cols: 1, rows: 1 },
        { cols: 1, rows: 1 },
        { cols: 1, rows: 1 },
        { cols: 1, rows: 1 },
        { cols: 1, rows: 1 },
        { cols: 1, rows: 1 },
        { cols: 1, rows: 1 },
      ]

      this.countColumn = [2, 2]
      this.sizeRow = '150px'
    } else {
      this.gridService = [
        { cols: 2, rows: 1 },
        { cols: 2, rows: 2 },
        { cols: 3, rows: 1 },
        { cols: 1, rows: 1 },
        { cols: 2, rows: 1 },
        { cols: 2, rows: 1 },
        { cols: 1, rows: 1 },
        { cols: 1, rows: 1 },
      ]

      this.countColumn = [3, 4]
      this.sizeRow = '200px'
    }
  }

  panelState(state: boolean): void {
    this.panelOpenState = state
    if (state) {
      this.messageBtnFooter = 'Menos informacion'
      setTimeout(() => {
        this.objNavegationService.setPositionScrooll(500)
      }, 150)
    } else this.messageBtnFooter = 'Mas informacion'
  }

  refresh() {
    this.objShareInformationService.viewLoading$.emit(true)
    this.objHttpService
      .getListCarousel({
        listId: [1, 2, 3],
      })
      .subscribe(
        (res) => {
          this.dataCarousel = this.objCryptoService.decrypted(res['data']).list
          this.objShareInformationService.viewLoading$.emit(false)
        },
        (err) => {
          this.objShareInformationService.viewLoading$.emit(false)
          this.objSnackBar.open('Error obtener carrusel', null, {
            duration: 2500,
            panelClass: ['snackBar_error'],
          })
        },
      )
  }

  navegate(opc: number, search: string) {
    this.objShareInformationService.viewLoading$.emit(true)
    this.objNavegationService.viewSideNav(false)

    switch (opc) {
      case 0:
        this.objNavegationService.navegatePage('Product/List')
        break

      case 1:
        {
          this.objLocalStorageService.save(
            'selpro',
            this.objCryptoService.encrypted(search),
          )
          this.objNavegationService.navegatePage('Product/List')
        }
        break
    }
  }
}
