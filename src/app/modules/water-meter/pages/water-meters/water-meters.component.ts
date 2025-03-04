import { Component } from '@angular/core';
import { WhatIsComponent } from '../../components/what-is/what-is.component';
import { TypeComponent } from '../../components/type/type.component';
import { BrandComponent } from '../../components/brand/brand.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { SeoService } from '../../../../services/seo.service';

@Component({
  selector: 'app-water-meters',
  standalone: true,
  imports: [WhatIsComponent, TypeComponent, BrandComponent],
  templateUrl: './water-meters.component.html',
  styleUrl: './water-meters.component.css',
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
export class WaterMetersComponent {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Medidores de agua | Venta de medidores de agua');
    this.seoService.setDescription(
      'Venta de medidores de agua, medidores de agua potable, medidor de agua potable y medidor de agua mecánicos, ultrasonicos y electromagnéticos para uso residencial, comercial e industrial. Alta precisión y durabilidad. ¡Cotiza hoy!'
    );

    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }
}
