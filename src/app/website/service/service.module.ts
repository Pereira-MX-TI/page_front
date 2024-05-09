import { NgxCaptchaModule } from 'ngx-captcha';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ListServiceComponent,
  ViewServiceComponent,
} from '@website/service/components';
import { ServiceRoutingModule } from './service-routing.module';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@website/shared/shared.module';

@NgModule({
  declarations: [ListServiceComponent, ViewServiceComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ServiceRoutingModule,
    NgxCaptchaModule,
  ],
})
export class ServiceModule {}
