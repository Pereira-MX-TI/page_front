import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeoService } from '../../../../services/seo.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-service',
  standalone: true,
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.5s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ServiceComponent {
  items: { title: string; list: string[]; url: string }[] = [
    {
      title: 'Quater: Administración del agua ',
      list: [
        'Administración de  consumo condominal',
        'Proyectos llave en mano',
        'Comercialización de  medidores de agua',
        'Gestión de dispositivos  mediante LoRaWAN',
        'Interconexión informativa  con los organismos',
        'Y mucho mas',
      ],
      url: 'assets/services/administración-del-agua/administración-del-agua',
    },
    {
      title: 'Instalación de medidores de agua',
      list: [
        'Instalación de micromedidores',
        'Instalación de macromedidores',
        'Adecuación de toma',
        'Reparación de toma',
        'Y mucho mas',
      ],
      url: 'assets/services/instalación-medidores-para-agua/instalación-medidores-para-agua',
    },
    {
      title: 'Prueba de medidores de agua',
      list: [
        'Caudal arranque',
        'Caudal nominal',
        'Caudal mínimo',
        'Caudal máximo',
        'Caudal de transición',
        'Y mucho mas',
      ],
      url: 'assets/services/prueba-de-medidores-de-agua/prueba-de-medidores-de-agua',
    },
    {
      title: 'Capacitación',
      list: [
        'Toma de lectura',
        'Instalaciones',
        'Normas del agua',
        'Gestión',
        'Y mucho mas',
      ],
      url: 'assets/services/capacitación-en-medidores-para-agua/capacitación-en-medidores-para-agua',
    },
    {
      title: 'Venta de productos hidráulicos',
      list: [
        'Medidores de agua',
        'Válvulas',
        'Conectores',
        'Empaques',
        'Pegamentos',
        'Y mucho mas',
      ],
      url: 'assets/services/venta-de-productos-hidráulicos/venta-de-productos-hidráulicos',
    },
    {
      title: 'Implementación telemetría',
      list: [
        'Pruebas de alcance',
        'Programación de módulos',
        'Instalación de antenas',
        'Configuración de gateways',
        'Y mucho mas',
      ],
      url: 'assets/telemetry/telemetría-para-medidores-para-agua/telemetría-para-medidores-para-agua',
    },
    {
      title: 'Detección de fugas',
      list: [
        'Detección de fugas en tuberías',
        'Pruebas de presión y hermeticidad',
        'Y muchos mas',
      ],
      url: 'assets/services/detección-de-fugas/detección-de-fugas',
    },
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Venta de medidores de agua | Servicios');
    this.seoService.setDescription(
      'Descubre nuestros servicios especializados para medidores de agua. Instalación, mantenimiento y soluciones personalizadas para un control eficiente del consumo.'
    );

    this.seoService.setImage(environment.ogImage);
    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }
}
