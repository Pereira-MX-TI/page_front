import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, zip } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductPipe } from '../../pipes/product.pipe';
import { Product } from '../../../../models/carousel_item.model';
import { HttpService } from '../../../../services/http.service';
import { NavigationService } from '../../../../services/navigation.service';
import { ShareInformationService } from '../../../../services/share-information.service';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { SeoService } from '../../../../services/seo.service';
import { VisorImgComponent } from '../../components/visor-img/visor-img.component';
import { SesionStorageService } from '../../../../services/sesion-storage.service';
import { Location } from '@angular/common';
import { Category } from '../../models/category.model';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialComponents } from '../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceModalComponent } from '../../../error-page/components/maintenance-modal/maintenance-modal.component';
import { WindowSizeService } from '../../../../services/window-size.service';
import { Router } from 'express';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    VisorImgComponent,
    MaterialComponents,
  ],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
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
export class ViewProductComponent {
  categories: Category[] = [];
  product: Product | null = null;
  productsByCategory: Product[] = [];
  _id: number | string = '';
  listSubscription: Subscription[] = [new Subscription()];
  productPipe: ProductPipe = new ProductPipe();
  formControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(1),
  ]);

  constructor(
    public dialog: MatDialog,
    public location: Location,
    private matSnackBar: MatSnackBar,
    private httpService: HttpService,
    private navigationService: NavigationService,
    private shareInformationService: ShareInformationService,
    private shareDataSearchService: ShareDataSearchService,
    private SesionStorageService: SesionStorageService,
    private seoService: SeoService,
    private activatedRoute: ActivatedRoute,
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit(): void {
    this.subscriptionChangeUrl();
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  private setMetaTags(title: string, description: string, img: string): void {
    this.seoService.setTitle(title);
    this.seoService.setDescription(description);
    if (img != '') this.seoService.setImage(img);

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
    if (this.SesionStorageService.exist('viewProduct')) {
      const { categories, product } =
        this.SesionStorageService.get('viewProduct');

      this.product = product;
      this.categories = categories;

      this.setMetaTags(
        this.product!.nombre,
        this.product!.description.detalle,
        this.product?.files.length == 0
          ? ''
          : this.productPipe.transform(
              this.product?.files[0].direccion,
              'picture-product'
            )
      );

      return;
    }

    zip(
      this.httpService.filtersProduct(),
      this.httpService.detailProduct({ id: this._id }),
      this.httpService.productsByCategory({ product_id: this._id })
    ).subscribe(
      (res) => {
        const { categories } = res[0].data;
        const { product } = res[1].data;

        this.productsByCategory = res[2].data;
        this.product = product;

        categories.forEach((itrCategory: Category) => {
          this.categories.push({
            ...itrCategory,
            select: this.product?.category.id === itrCategory.id,
          });
        });

        this.SesionStorageService.set('viewProduct', {
          categories: this.categories,
          product: this.product,
          productsByCategory: this.productsByCategory,
        });

        this.setMetaTags(
          this.product!.nombre,
          this.product!.description.detalle,
          this.product?.files.length == 0
            ? ''
            : this.productPipe.transform(
                this.product?.files[0].direccion,
                'picture-product'
              )
        );
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

  viewCategory(res: Category) {
    this.navigationService.navigatePage('Productos/Busqueda', {
      data: res.nombre,
    });

    this.shareDataSearchService.close$.emit();
  }

  register(): void {
    this.dialog.open(MaintenanceModalComponent, {
      autoFocus: false,
    });
  }

  sharedSocialNetwork(type: 'whatsapp' | 'facebook'): void {
    const currentUrl: string = window.location.href;

    const shareUrl: string =
      type === 'whatsapp'
        ? `https://wa.me?text=${currentUrl}`
        : `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;

    if (
      'share' in navigator &&
      typeof navigator.share === 'function' &&
      this.windowSizeService.checkMaxScreenSize(650)
    ) {
      navigator
        .share({
          title: this.product?.nombre,
          text: this.product?.description.detalle,
          url: shareUrl,
        })
        .catch((error) => console.error('Error sharing:', error));
    } else {
      window.open(shareUrl, '_blank');
    }
  }
}
