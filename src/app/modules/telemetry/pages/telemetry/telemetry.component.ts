import { Component } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-telemetry',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.css'],
})
export class TelemetryComponent {
  imgProducts: { url: string; alt: string; description: string }[] = [
    {
      url: '/assets/general/ultrasonido_valvula.avif',
      alt: 'medidor de agua ultrasonico con válvula',
      description:
        'Medidor de agua ultrasonico con válvula de cierre automático con modulo integrado de comunicación lorawan',
    },
    {
      url: '/assets/general/antena_v1.avif',
      alt: 'antena lorawan version 1',
      description: 'Modulo lorawan version 1',
    },

    {
      url: '/assets/general/ultrasonico.avif',
      alt: 'medidor de agua ultrasonico',
      description:
        'Medidor de agua ultrasonico con modulo integrado de comunicación lorawan',
    },
    {
      url: '/assets/general/gateway.avif',
      alt: 'gateway lorawan',
      description: 'Router con comunicación loraWan',
    },
    {
      url: '/assets/general/ultrasonico_macro.avif',
      alt: 'medidor de agua ultrasonico macro',
      description:
        'Medidor de agua ultrasonico Macro con modulo integrado de comunicación lorawan',
    },
    {
      url: '/assets/general/medidor_antena.avif',
      alt: 'medidor de agua con antena empotrada',
      description:
        'Medidor de agua mecánico con con modulo de comunicación lorawan empotrado',
    },
    {
      url: '/assets/general/antena_v2.avif',
      alt: 'antena lorawan version 2',
      description: 'Modulo lorawan version 2 con cambio de pila',
    },

    {
      url: '/assets/general/extensor_antena.avif',
      alt: 'extensor de antena del gateway',
      description: 'Extensor de antena loraWan',
    },
  ];
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Telemetría | Medidores de agua');
    this.seoService.setDescription(
      'Pagina de telemetría para medidores de agua.'
    );

    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }
}
