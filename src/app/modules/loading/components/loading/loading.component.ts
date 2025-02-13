import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShareInformationService } from '../../../../services/share-information.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  statusView: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private objShareInformationService: ShareInformationService) {}

  ngOnInit(): void {
    this.subscriptionLoading();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private subscriptionLoading(): void {
    this.objShareInformationService.viewLoading$.subscribe(
      (res: boolean) => (this.statusView = res)
    );
  }
}
