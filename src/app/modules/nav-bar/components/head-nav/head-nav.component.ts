import { Component, OnDestroy, OnInit, output, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { SelectOptionNav } from '../../../../models/select_option_nav.model';
import { SelectOptionNavObservable } from '../../../../observables/select_option_nav.observable';
import { ShareInformationService } from '../../../../services/share-information.service';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { InputSearchMovilComponent } from '../../../search/components/input-search-movil/input-search-movil.component';
import { InputSearchComponent } from '../../../search/components/input-search/input-search.component';
import { MaterialComponents } from '../../../material/material.module';
import { RouterModule } from '@angular/router';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-head-nav',
  standalone: true,

  imports: [InputSearchComponent, RouterModule, MaterialComponents],

  templateUrl: './head-nav.component.html',
  styleUrls: ['./head-nav.component.css'],
})
export class HeadNavComponent implements OnInit, OnDestroy {
  selectOption: SelectOptionNav = {
    home: false,
    product: false,
    service: false,
    telemetry: false,
    water_meter: false,

    invoice: false,
    contact: false,
  };

  listSubscription: Subscription[] = [new Subscription(), new Subscription()];
  viewSearch: boolean = false;
  statusSideNav = output<void>();

  public constructor(
    private dialogModal: Dialog,
    private selectOptionNavObservable: SelectOptionNavObservable,
    private shareInformationService: ShareInformationService,
    private shareDataSearchService: ShareDataSearchService
  ) {}

  ngOnInit(): void {
    this.subscriptionSelectOptionNav();
    this.subscriptionSearch();
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  private subscriptionSelectOptionNav(): void {
    this.listSubscription[0] = this.selectOptionNavObservable.data$.subscribe(
      (res: SelectOptionNav | null) => {
        if (!res) return;

        this.selectOption = res;
      }
    );
  }

  private subscriptionSearch(): void {
    this.listSubscription[1] = this.shareDataSearchService.close$.subscribe(
      () => {
        this.dialogModal.closeAll();
        this.viewSearch = false;
      }
    );
  }

  clickSideNav(): void {
    this.statusSideNav.emit();
  }

  openModalSearch(): void {
    this.dialogModal.open(InputSearchMovilComponent);
  }
}
