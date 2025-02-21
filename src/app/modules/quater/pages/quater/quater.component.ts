import { Component, ElementRef } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Background1Component } from '../../components/background-1/background-1.component';
import { SeoService } from '../../../../services/seo.service';
import Viewer from 'viewerjs';

@Component({
  selector: 'app-quater',
  standalone: true,
  imports: [Background1Component],
  templateUrl: './quater.component.html',
  styleUrl: './quater.component.css',
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
export class QuaterComponent {
  viewer: any = null;

  constructor(private seoService: SeoService, public elementRef: ElementRef) {}

  ngOnInit(): void {
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Quater');
    this.seoService.setDescription(
      'Optimiza la administración del agua con nuestra solución basada en tecnología LoRaWAN. Controla el consumo, la calidad y la distribución del agua en tiempo real con sensores IoT de largo alcance y bajo consumo. Reduce desperdicios, mejora la eficiencia operativa y toma decisiones estratégicas con datos precisos. Ideal para empresas, municipios y organismos de agua, nuestra plataforma ofrece monitoreo remoto, mantenimiento predictivo y un uso sustentable del recurso. ¡Descubre cómo la digitalización del agua puede transformar la gestión hídrica!'
    );
    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }

  viewImage(elementRef: ElementRef, id: string): void {
    const img = elementRef.nativeElement.querySelector(id);

    if (!img) return;

    if (this.viewer) this.viewer.destroy();

    this.viewer = new Viewer(img, { fullscreen: true, toolbar: false });
    this.viewer.show();
  }
}
