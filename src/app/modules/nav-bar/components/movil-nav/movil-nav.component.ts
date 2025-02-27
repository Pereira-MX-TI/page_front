import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectOptionNav } from '../../../../models/select_option_nav.model';
import { SelectOptionNavObservable } from '../../../../observables/select_option_nav.observable';
import { ShareInformationService } from '../../../../services/share-information.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movil-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './movil-nav.component.html',
  styleUrls: ['./movil-nav.component.css'],
})
export class MovilNavComponent implements OnInit, OnDestroy {
  selectOption: SelectOptionNav = {
    home: false,
    product: false,
    service: false,
    telemetry: false,
    water_meter: false,
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
