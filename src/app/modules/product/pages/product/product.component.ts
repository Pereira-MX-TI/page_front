import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { zip } from 'rxjs';
import { Carousel } from '../../../../models/carousel.model';
import { SeoService } from '../../../../services/seo.service';
import { HttpService } from '../../../../services/http.service';
import { CarouselProductsComponent } from '../../../carousel/components/carousel_product/carousel_products.component';
import { FiltersProductComponent } from '../../components/filters-product/filters-product.component';
import { SesionStorageService } from '../../../../services/sesion-storage.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CarouselProductsComponent, FiltersProductComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
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
export class ProductComponent {
  water_meters: Carousel | null = null;
  valves: Carousel | null = null;
  connections: Carousel | null = null;
  itronAccellProducts: Carousel | null = null;
  alfaProducts: Carousel | null = null;

  constructor(
    private seoService: SeoService,
    private matSnackBar: MatSnackBar,
    private httpService: HttpService,
    private SesionStorageService: SesionStorageService
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Venta de medidores de agua | Productos');
    this.seoService.setDescription(
      'Explora nuestra variedad de productos hidráulicos. Soluciones de alta calidad para medición, control y gestión eficiente del agua.'
    );

    this.seoService.setImage(environment.ogImage);
    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }

  refresh(): void {
    if (this.SesionStorageService.exist('carouselsProduct')) {
      const {
        water_meters,
        valves,
        connections,
        itronAccellProducts,
        alfaProducts,
      } = this.SesionStorageService.get('carouselsProduct');

      this.water_meters = { ...water_meters };
      this.valves = { ...valves };
      this.connections = { ...connections };
      this.itronAccellProducts = { ...itronAccellProducts };
      this.alfaProducts = { ...alfaProducts };

      return;
    }

    zip(
      this.httpService.specificCarousel('water_meter'),
      this.httpService.specificCarousel('valve'),
      this.httpService.specificCarousel('connection'),
      this.httpService.specificCarousel('itron-accell'),
      this.httpService.specificCarousel('alfa')
    ).subscribe(
      (res) => {
        this.water_meters = res[0].data;
        this.valves = res[1].data;
        this.connections = res[2].data;
        this.itronAccellProducts = res[3].data;
        this.alfaProducts = res[4].data;

        this.SesionStorageService.set('carouselsProduct', {
          water_meters: this.water_meters,
          valves: this.valves,
          connections: this.connections,
          itronAccellProducts: this.itronAccellProducts,
          alfaProducts: this.alfaProducts,
        });
      },
      (err) => {
        this.matSnackBar.open('Error obtener datos', '', {
          duration: 2500,
          panelClass: ['snackBar_error'],
        });
      }
    );
  }
}
