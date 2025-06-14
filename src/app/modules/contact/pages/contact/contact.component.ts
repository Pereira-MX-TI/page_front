import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
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
export class ContactComponent implements OnInit {
  email: string = 'solucionescomerciales_jmpf@Outlook.com';
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Contacto | Medidores de agua');
    this.seoService.setDescription(
      'Pagina de contacto para medidores de agua.'
    );

    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }
}
