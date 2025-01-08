import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  email: string = 'solucionescomerciales_jmpf@Outlook.com';
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Contacto | Medidores de agua');
    this.seoService.setDescription('pagina de contacto');

    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }
}
