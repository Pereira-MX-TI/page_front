import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  statusView: boolean = false;
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscriptionLoading();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private subscriptionLoading(): void {}
}
