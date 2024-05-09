import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ListServiceComponent,
  ViewServiceComponent,
} from '@website/service/components';
import { ViewServiceGuard } from '@website/service/guards/view-service.guard';

const routes: Routes = [
  { path: 'List', component: ListServiceComponent },
  {
    path: 'View/:data',
    component: ViewServiceComponent,
    canActivate: [ViewServiceGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
