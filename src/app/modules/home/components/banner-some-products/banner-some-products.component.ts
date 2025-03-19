import { Component } from '@angular/core';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner-some-products',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './banner-some-products.component.html',
  styleUrls: ['./banner-some-products.component.css'],
})
export class BannerSomeProductsComponent {
  products_row_1: string[] = [
    'Niples',
    'Tees',
    'Sensor de pulsos',
    'Filtros',
    'Válvula expulsora de aire',
    'Pvc',
    'Dosificadora',
    'Emisor de pulsos',
    'Abrazadera',
    'Válvula media luna',
  ];

  products_row_2: string[] = [
    'Kit de conexiones',
    'Teflon',
    'Codos',
    'Adhesivo',
    'Seguros',
    'Estrella expansiva',
    'Tubería',
    'Cpvc',
    'Soldadura',
    'Gas',
  ];

  products_row_3: string[] = [
    'Empaque plano',
    'Válvula reductora',
    'Adaptadores',
    'Tuerca union',
    'Caja para medidor',
    'Válvula check',
    'Tapón',
    'Válvula media luna',
    'Conexiones',
    'Empaque cónico',
  ];
  constructor(public shareDataSearchService: ShareDataSearchService) {}

  functionConvertSearch(res: string): string {
    return encodeURIComponent(res);
  }
}
