import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Filter } from '../../models/filter.model';
import { Subscription, zip } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductPipe } from '../../pipes/product.pipe';
import { Product } from '../../../../models/carousel_item.model';
import { HttpService } from '../../../../services/http.service';
import { NavigationService } from '../../../../services/navigation.service';
import { ShareInformationService } from '../../../../services/share-information.service';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { SeoService } from '../../../../services/seo.service';
import { VisorImgComponent } from '../../components/visor-img/visor-img.component';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [VisorImgComponent],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent {
  categories: Filter[] = [];
  product: Product | null = null;
  _id: number | string = '';
  listSubscription: Subscription[] = [new Subscription()];
  productPipe: ProductPipe = new ProductPipe();

  constructor(
    private matSnackBar: MatSnackBar,
    private httpService: HttpService,
    private navigationService: NavigationService,
    private shareInformationService: ShareInformationService,
    private shareDataSearchService: ShareDataSearchService,
    private seoService: SeoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
    this.subscriptionChangeUrl();
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Productos | Medidores de agua');
    this.seoService.setDescription('Pagina de productos de hidráulicos.');

    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }

  private subscriptionChangeUrl(): void {
    this.activatedRoute.queryParams.subscribe(({ data }) => {
      this._id = atob(data);
      this.refresh();
    });
  }

  refresh(): void {
    zip(
      this.httpService.filtersProduct(),
      this.httpService.detailProduct({ id: this._id, publicity: 1 })
    ).subscribe(
      (res) => {
        const { categories } = res[0].data;
        const { product } = res[1].data;

        this.categories = categories;
        this.product = product;

        console.log(this.product);
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
