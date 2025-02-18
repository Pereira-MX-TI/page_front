import { Component } from '@angular/core';
import { MaterialComponents } from '../../../material/material.module';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../../../../services/navigation.service';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { SesionStorageService } from './../../../../services/sesion-storage.service';
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
      url_img: './../../../../../assets/products/conections_all.avif',
      title: 'conexiones pvc, cpvc, ppr, galvanizado',
    },
    {
      name: 'Medidores de agua',
      url_img: './../../../../../assets/products/water_meter_all.avif',
      title: 'Medidores de agua',
    },
    {
      name: 'Válvulas',
      url_img: './../../../../../assets/products/valves_all.avif',
      title: 'Válvulas para agua',
    },
    {
      name: 'Adhesivos',
      url_img: './../../../../../assets/products/adhesive_all.avif',
      title: 'Pegamentos, cintas, teflones',
    },
    {
      name: 'Kits',
      url_img: './../../../../../assets/products/kit_all.avif',
      title: 'kit plástico, bronce y empaques',
    },
    {
      name: 'Otros',
      url_img: './../../../../../assets/products/another_all.avif',
      title: 'cajas de banqueta, geofonos, segurisellos',
    },
  ];
}
