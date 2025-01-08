import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoFoundComponent } from './pages/page-error/no-found.component';

const routes: Routes = [
  { path: '', component: NoFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPageRoutingModule {}
