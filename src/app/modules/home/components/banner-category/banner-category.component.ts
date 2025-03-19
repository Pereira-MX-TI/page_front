import { Component } from '@angular/core';
import { MaterialComponents } from '../../../material/material.module';
import { Platform } from '@angular/cdk/platform';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner-category',
  standalone: true,
  imports: [RouterModule, MaterialComponents],
  templateUrl: './banner-category.component.html',
  styleUrls: ['./banner-category.component.css'],
})
export class BannerCategoryComponent {
  constructor(
    public platform: Platform,
    public shareDataSearchService: ShareDataSearchService
  ) {}

  categories: { name: string; url_img: string; title: string }[] = [
    {
      name: 'Conexiones',
      url_img: './assets/products/conexiones/conexiones',
      title: 'conexiones pvc, cpvc, ppr, galvanizado',
    },
    {
      name: 'Medidores de agua',
      url_img: './assets/products/medidores-de-agua/medidores-de-agua',
      title: 'Medidores de agua',
    },
    {
      name: 'Válvulas',
      url_img: './assets/products/válvulas-para-agua/válvulas-para-agua',
      title: 'Válvulas para agua',
    },
    {
      name: 'Adhesivos',
      url_img:
        './assets/products/teflón-cinta-pegamento/teflón-cinta-pegamento',
      title: 'Pegamentos, cintas, teflones',
    },
    {
      name: 'Kits',
      url_img:
        './assets/products/kit-de-conexión-para-medidores-de-agua/kit-de-conexión-para-medidores-de-agua',
      title: 'kit de conexión para medidores de agua',
    },
    {
      name: 'Otros',
      url_img:
        './assets/products/empaques-sellos-cajas-otros/empaques-sellos-cajas-otros',
      title: 'cajas de banqueta, geofonos, sellos',
    },
  ];

  functionConvertSearch(res: string): string {
    return encodeURIComponent(res);
  }
}
