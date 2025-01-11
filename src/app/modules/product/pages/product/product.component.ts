import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { zip } from 'rxjs';
import { Carousel } from 'src/app/models/carousel.model';
import { HttpService } from 'src/app/services/http.service';
import { SeoService } from 'src/app/services/seo.service';
import { ShareInformationService } from 'src/app/services/share-information.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
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
    private shareInformationService: ShareInformationService
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Productos | Medidores de agua');
    this.seoService.setDescription('Pagina de productos de hidráulicos.');

    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }

  refresh(): void {
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
        this.shareInformationService.viewLoading$.emit(false);
      },
      (err) => {
        this.shareInformationService.viewLoading$.emit(false);
        this.matSnackBar.open('Error obtener carrusel', '', {
          duration: 2500,
          panelClass: ['snackBar_error'],
        });
      }
    );
  }
}
