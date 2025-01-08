import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectOptionNav } from 'src/app/models/select_option_nav.model';
import { SelectOptionNavObservable } from 'src/app/observables/select_option_nav.observable';
import { ShareInformationService } from 'src/app/services/share-information.service';
import { Dialog } from '@angular/cdk/dialog';
import { InputSearchMovilComponent } from 'src/app/modules/search/components/input-search-movil/input-search-movil.component';

@Component({
  selector: 'app-head-nav',
  templateUrl: './head-nav.component.html',
  styleUrls: ['./head-nav.component.css'],
})
export class HeadNavComponent implements OnInit, OnDestroy {
  selectOption: SelectOptionNav = {
    home: false,
    product: false,
    service: false,
    telemetry: false,
    invoice: false,
    contact: false,
  };

  listSubscription: Subscription[];
  wordSearch: string = '';

  public constructor(
    private dialogModal: Dialog,
    private selectOptionNavObservable: SelectOptionNavObservable,
    private shareInformationService: ShareInformationService
  ) {
    this.listSubscription = [new Subscription(), new Subscription()];
  }

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
    this.listSubscription[1] = this.shareInformationService.search$.subscribe(
      (res: string) => {
        this.wordSearch = res;
        this.dialogModal.closeAll();
      }
    );
  }

  clickSideNav(): void {
    this.shareInformationService.sideNav$.emit();
  }

  applySearch(): void {
    this.dialogModal.open(InputSearchMovilComponent, {
      data: this.wordSearch,
    });
  }
}
