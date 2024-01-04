import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { ViewServiceComponent } from './components/view-service/view-service.component';
import { ViewServiceGuard } from './guards/view-service.guard';

const routes: Routes = [
  {path:"List",component:ListServiceComponent},
  {path:"View/:data",component:ViewServiceComponent,canActivate:[ViewServiceGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
