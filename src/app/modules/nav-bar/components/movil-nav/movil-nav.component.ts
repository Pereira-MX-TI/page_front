import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShareInformationService } from 'src/app/services/share-information.service';
import { SelectOptionNav } from 'src/app/models/select_option_nav.model';
import { Subscription } from 'rxjs';
import { SelectOptionNavObservable } from 'src/app/observables/select_option_nav.observable';

@Component({
  selector: 'app-movil-nav',
  templateUrl: './movil-nav.component.html',
  styleUrls: ['./movil-nav.component.css'],
})
export class MovilNavComponent implements OnInit, OnDestroy {
  selectOption: SelectOptionNav = {
    home: false,
    product: false,
    service: false,
    telemetry: false,
    invoice: false,
    contact: false,
  };
  listSubscription: Subscription[] = [new Subscription()];

  constructor(
    private selectOptionNavObservable: SelectOptionNavObservable,
    public shareInformationService: ShareInformationService
  ) {}

  ngOnInit(): void {
    this.subscriptionSelectOptionNav();
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
}
