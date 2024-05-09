import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { ProductPipe } from 'src/app/product/pipes/product.pipe'
import { CryptoService } from '../../../services/crypto/crypto.service'
import { NavegationService } from '@services/navegation/navegation.service'
import { ShareInformationService } from '@services/share-information/share-information.service'
import { HttpService } from '@services/http/http.service'
import { LocalStorageService } from '@services/local-storage/local-storage.service'
import { WindowSizeService } from '@services/window-size/window-size.service'

@Component({
  selector: 'carousel-cards',
  templateUrl: './carousel-cards.component.html',
  styleUrls: ['./carousel-cards.component.css'],
})
export class CarouselCardsComponent implements OnInit {
  @Input('dataSlides') dataSlides: any
  @ViewChild('slickModal', { static: true }) slickModal: any

  viewSlide: number
  slideConfig = null
  pipeProduct: ProductPipe

  constructor(
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
    this.pipeProduct = new ProductPipe()
  }

  ngOnInit(): void {
    this.redimensionComponent()
    this.renderer.listen(window, 'resize', () => {
      this.redimensionComponent()
    })

    this.slideConfig = {
      slidesToShow: this.viewSlide,
      slidesToScroll: this.viewSlide,
      prevArrow: false,
      nextArrow: false,
      event: { beforeChange: function () {}, afterChange: function () {} },

      responsive: [
        {
          breakpoint: 319,
          settings: { slidesToShow: 2, slidesToScroll: 2 },
        },
        {
          breakpoint: 767,
          settings: { slidesToShow: 3, slidesToScroll: 3 },
        },
        {
          breakpoint: 1023,
          settings: { slidesToShow: 4, slidesToScroll: 4 },
        },
        {
          breakpoint: 5000,
          settings: { slidesToShow: 5, slidesToScroll: 5 },
        },
      ],
    }
  }

  redimensionComponent(): void {
    if (this.objWindowSizeService.checkMaxScreenSize(750)) this.viewSlide = 2
    else if (this.objWindowSizeService.checkMaxScreenSize(890))
      this.viewSlide = 3
    else if (this.objWindowSizeService.checkMaxScreenSize(1125))
      this.viewSlide = 4
    else this.viewSlide = 5
  }

  viewProduct(product: any): void {
    if (product.product != undefined) product = product.product

    if (!this.objRouter.url.includes('/Product/View'))
      this.objNavegationService.navegatePage(
        '/Product/View/' +
          btoa(this.objCryptoService.encrypted(product)).replace(
            new RegExp('/', 'g'),
            '~',
          ),
      )
    else this.objShareInformationService.reloadSamePage$.emit(product)
  }
}
