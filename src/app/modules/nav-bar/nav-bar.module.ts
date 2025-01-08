import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadNavComponent } from './components/head-nav/head-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovilNavComponent } from './components/movil-nav/movil-nav.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SearchModule } from '../search/search.module';

@NgModule({
  declarations: [HeadNavComponent, MovilNavComponent],
  exports: [HeadNavComponent, MovilNavComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SearchModule,
  ],
})
export class NavBarModule {}
