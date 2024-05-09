import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { customErrorStateMatcher } from 'src/app/customErrorStateMatcher'
import { CryptoService } from '../../../services/crypto/crypto.service'
import { HttpService } from '@services/http/http.service'
import { LocalStorageService } from '@services/local-storage/local-storage.service'
import { NavegationService } from '@services/navegation/navegation.service'
import { PdfService } from '@services/pdf/pdf.service'
import { ShareInformationService } from '@services/share-information/share-information.service'
import { WindowSizeService } from '@services/window-size/window-size.service'
import { Meta, Title } from '@angular/platform-browser'
import { ModalDialogComponent } from 'src/app/shared/components/modal-dialog/modal-dialog.component'

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css'],
})
export class ViewServiceComponent implements OnInit, AfterViewInit, OnDestroy {
  listSubscription: Subscription[]
  formGroup: UntypedFormGroup

  listPart: any
  currentService: any
  currentPart: any
  siteKey: string
  matcher: customErrorStateMatcher

  constructor(
    private title: Title,
    private meta: Meta,
    private objPdfService: PdfService,
    public dialog: MatDialog,
    public doneCheck: MatDialog,
    private objRouter: Router,
    private objSnackBar: MatSnackBar,
    private objHttpService: HttpService,
    private objActivatedRoute: ActivatedRoute,
    private objLocalStorageService: LocalStorageService,
    private objCryptoService: CryptoService,
    private objWindowSizeService: WindowSizeService,
    private objShareInformationService: ShareInformationService,
    public objNavegationService: NavegationService,
  ) {
    this.listSubscription = [new Subscription(), new Subscription()]
    this.objNavegationService.setPositionScrooll(0)

    this.listPart = [
      [
        {
          subTitle: '¿Ques es?',
          description:
            'La TELEMETRIA en medidores de agua es una herramienta que permite conocer en tiempo real las condiciones operativas de la infraestructura hidráulica dentro y fuera del área Metropolitana, como: la medición y control a distancia de equipos de los sistemas de forma manual o automática, niveles de tanques, medidores de flujo, presión, etc.; así como también automatizar y controlar de manera remota su funcionamiento; además es capaz de identificar fallas y detectar alarmas en tiempo real y reducir el lapso de respuesta para corregir estados críticos de las instalaciones, permitiendo así el envío de la información recabada hacia un sistema de monitoreo y/o despliegue de datos en intranet desde cualquier computadora',
        },
        {
          subTitle: 'Caracteristicas',
          image: './../../../../assets/telemetry_backgroud.jpg',
          listCharacteristic: [
            'Lectura diaria',
            'Análisis de datos',
            'Alarma anti fraudes',
            'Eliminación de error humano',
            'Alarma de retorno de agua' /*
            'Seguridad y tranquilidad para el usuario',
            'Cuidado de ergonomía para el trabajador',*/,
            'Reducción de tiempos operativos',
            'Reducción de riesgo de trabajo',
            'Reducción de costos operativos',
          ],
        },
        {
          subTitle: 'Beneficios',
          image: './../../../../assets/example_lora_simple.png',
          listBenefit: [
            'La telemetría aplicada a la gestión del agua es una herramienta que sirve para mejorar la obtención, distribución y consumo del agua.',
            'Por medio de telemetría es posible monitorear el consumo de agua evitando al máximo su desperdicio.',
            'El registro telemétrico del agua que se distribuye a las comunidades permite su ahorro y sustentabilidad.',
            'Invertir en el campo de la telemetría aplicada a la gestión del agua es una buena oportunidad para hacer negocios rentables.',
          ],
        },
      ],
      [
        {
          subTitle: '¿Ques es?',
          description:
            'La manera tradicional de encontrar una fuga de agua era mediante la apertura de zanjas. Sin embargo, gracias a la tecnología, actualmente es posible detectar fugas mediante varios métodos que ofrecen no solo acortar el tiempo, sino una mayor eficacia. Uno de estos métodos es el geófono, un sistema de detección de fugas que ha mostrado eficacia y que reduce el tiempo empleado en esta labor. Este aparato emite ondas de sonido en las áreas de suelo o tierra que se quiere analizar, con lo que se logran captar las vibraciones que emite la presión del agua al salir por la tubería afectada. Ello se traduce en un registro de movimiento que se transmite a una unidad central. No importa el material del que esté hecha la tubería, ya que solo se centra en el sonido del agua',
        },
        {
          subTitle: 'Caracteristicas',
          image: './../../../../assets/telemetry_backgroud.jpg',
          listCharacteristic: [
            'Tecnologia audicular',
            'Velocidad y eficacia',
            'Personal calificado',
          ],
        },
        {
          subTitle: 'Beneficios',
          image: './../../../../assets/example_detection_leakage.jpg',
          listBenefit: [
            'Deteccion de consumo inusual de agua',
            'Prevencion de daños de infraestructura',
            'Deteccion de fugas silenciosas',
            'Ahorro de recursos',
          ],
        },
      ],
      [
        {
          subTitle: '¿Ques es?',
          description:
            'Una toma domiciliaria es la parte del sistema de abastecimiento por medio de la cual el usuario dispone de agua en su predio. Su adecuado funcionamiento depende de una selección cuidadosa de los materiales que se utilizan, de mano de obra calificada, de la observancia de las especificaciones de construcción y de la correcta supervisión de la ejecución de la obra.El personal que realice cualquier actividad relacionada con la instalación de tomas domiciliarias debe ser o estar calificado por el organismo operador o dependencia responsable, en los procedimientos y métodos de instalación de tomas domiciliarias aprobados o establecidos en las especificaciones de construcción correspondientes.',
        },
        {
          subTitle: 'Caracteristicas',
          image: './../../../../assets/telemetry_backgroud.jpg',
          listCharacteristic: [
            'Variados tipos de materiales',
            'Medidores de agua de distintas clases y medidas',
            'Adecuaciones en tomas',
            'Valvulas y llaves dependiendo la necesidades',
            'Cuadro de medicion dependiendo la toma',
          ],
        },
        {
          subTitle: 'Beneficios',
          image: './../../../../assets/example_install_water_meter.jpg',
          listBenefit: [
            'Correcto funcionamiento de medidor de agua',
            'Cumplimiento de normas mexicanas',
            'Medicion adecuada',
            'Mayor tiempo de vida en materiales',
          ],
        },
      ],
    ]

    this.currentService = this.objCryptoService.decrypted(
      atob(
        this.objActivatedRoute.snapshot.paramMap
          .get('data')
          .replace(new RegExp('~', 'g'), '/'),
      ),
    ).service
    this.currentPart = this.listPart[this.currentService.opc]

    this.siteKey = '6Ldh7AIgAAAAAEacOyipXcnaEqTDDKJW6yxlRoiF'
    this.formGroup = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required]),
      phone: new UntypedFormControl(''),
      cp: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl('', [Validators.required]),
      recaptcha: new UntypedFormControl('', [Validators.required]),
    })
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.objNavegationService.currentSelectMenu(this.objRouter.url)
    }, 100)
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe()
    })
  }

  sentRequest(): void {
    if (this.formGroup.valid) {
      this.objShareInformationService.viewLoading$.emit(true)
      this.objHttpService
        .registerInfoServiceWeb({
          contact: {
            name: this.formGroup.value['name'],
            email: this.formGroup.value['email'],
            phone: this.formGroup.value['phone'],
            cp: this.formGroup.value['cp'],
            description: this.formGroup.value['description'],
          },
          ip_address: this.objCryptoService.decrypted(
            this.objLocalStorageService.view('adip'),
          ),
          service: this.currentService.title,
        })
        .subscribe(
          (res) => {
            if (res['data'] != undefined) {
              this.objShareInformationService.viewLoading$.emit(false)

              this.doneCheck.open(ModalDialogComponent, {
                closeOnNavigation: true,
                autoFocus: false,
                data: {
                  message: 'La solicitud ha sido enviada con exito',
                  opcView: 3,
                },
              })

              this.formGroup.reset()

              this.formGroup.controls.name.markAsPending()
              this.formGroup.controls.email.markAsPending()
              this.formGroup.controls.cp.markAsPending()
              this.formGroup.controls.description.markAsPending()
            } else {
              this.objShareInformationService.viewLoading$.emit(false)
              this.objSnackBar.open(res['description'], null, {
                duration: 3000,
                panelClass: ['snackBar_error'],
              })
            }
          },
          (err) => {
            this.objShareInformationService.viewLoading$.emit(false)
            this.objSnackBar.open('Error enviar solicitud', null, {
              duration: 2500,
              panelClass: ['snackBar_error'],
            })
          },
        )
    } else {
      this.formGroup.controls.name.markAsTouched()
      this.formGroup.controls.email.markAsTouched()
      this.formGroup.controls.cp.markAsTouched()
      this.formGroup.controls.description.markAsTouched()
    }
  }
}
