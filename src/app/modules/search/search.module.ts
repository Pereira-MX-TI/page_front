import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { InputSearchMovilComponent } from './components/input-search-movil/input-search-movil.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputSearchComponent, InputSearchMovilComponent],
  exports: [InputSearchComponent, InputSearchMovilComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
})
export class SearchModule {}
