import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPageRoutingModule } from './error-page-routing.module';
import { NoFoundComponent } from './pages/page-error/no-found.component';

@NgModule({
  declarations: [NoFoundComponent],
  imports: [CommonModule, ErrorPageRoutingModule],
})
export class ErrorPageModule {}
