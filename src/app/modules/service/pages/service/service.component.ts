import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { SeoService } from '../../../../services/seo.service';

@Component({
  selector: 'app-service',
  standalone: true,
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
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
      url: 'assets/quater/presentation4.avif',
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
      url: 'assets/general/water_meter_installation.avif',
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
      url: 'assets/general/test_bench.avif',
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
      url: 'assets/general/training.avif',
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
      url: 'assets/products/products_all.avif',
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
      url: 'assets/general/telemetria.avif',
    },
    {
      title: 'Detección de fugas',
      list: [
        'Detección de fugas en tuberías',
        'Pruebas de presión y hermeticidad',
        'Y muchos mas',
      ],
      url: 'assets/general/leakage.avif',
    },
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Servicios | Medidores de agua');
    this.seoService.setDescription(
      'Descubre nuestros servicios especializados para medidores de agua. Instalación, mantenimiento y soluciones personalizadas para un control eficiente del consumo.'
    );

    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }
}
