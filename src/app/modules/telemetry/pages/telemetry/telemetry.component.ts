import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeoService } from '../../../../services/seo.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-telemetry',
  standalone: true,
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.css'],
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
export class TelemetryComponent {
  imgProducts: { url: string; alt: string; description: string }[] = [
    {
      url: './assets/telemetry/medidor-ultrasonico-con-válvula-para-agua/medidor-ultrasonico-con-válvula-para-agua',
      alt: 'medidor ultrasonico con válvula para-agua',
      description:
        'Medidor de agua ultrasonico con válvula de cierre automático con modulo integrado de comunicación lorawan',
    },
    {
      url: './assets/telemetry/antena-lorawan-para-medidor-para-agua-v1/antena-lorawan-para-medidor-para-agua-v1',
      alt: 'antena lorawan para medidor de agua v1',
      description: 'Modulo lorawan version 1',
    },

    {
      url: './assets/telemetry/micromedidor-ultrasonico-para-agua/micromedidor-ultrasonico-para-agua',
      alt: 'micromedidor ultrasonico de agua',
      description:
        'Medidor de agua ultrasonico con modulo integrado de comunicación lorawan',
    },
    {
      url: './assets/telemetry/extensor-antena-lorawan-para-gateway/extensor-antena-lorawan-para-gateway',
      alt: 'extensor antena lorawan para gateway',
      description: 'Router con comunicación loraWan',
    },
    {
      url: './assets/telemetry/macromedidor-ultrasonico-para-agua/macromedidor-ultrasonico-para-agua',
      alt: 'medidor de agua ultrasonico macro',
      description:
        'Medidor de agua ultrasonico Macro con modulo integrado de comunicación lorawan',
    },
    {
      url: './assets/telemetry/medidor-para-agua-con-modulo-lorawan/medidor-para-agua-con-modulo-lorawan',
      alt: 'medidor de agua con modulo lorawan empotrado',
      description:
        'Medidor de agua mecánico con con modulo de comunicación lorawan empotrado',
    },
    {
      url: './assets/telemetry/antena-lorawan-para-medidor-para-agua-v2/antena-lorawan-para-medidor-para-agua-v2',
      alt: 'antena lorawan version 2',
      description: 'Modulo lorawan version 2 con cambio de pila',
    },

    {
      url: './assets/telemetry/extensor-antena-lorawan-para-gateway/extensor-antena-lorawan-para-gateway',
      alt: 'extensor de antena del gateway',
      description: 'Extensor de antena loraWan',
    },
  ];
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Venta de medidores de agua | Telemetría');
    this.seoService.setDescription(
      'Accede a la telemetría avanzada para medidores de agua. Monitorea y gestiona el consumo en tiempo real con precisión y eficiencia.'
    );

    this.seoService.setImage(environment.ogImage);
    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }
}
