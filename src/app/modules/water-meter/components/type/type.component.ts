import { Component } from '@angular/core';
import { MaterialComponents } from '../../../material/material.module';
import { ShareDataSearchService } from '../../../search/services/share-data-search.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-type',
  standalone: true,
  imports: [MaterialComponents, RouterModule],
  templateUrl: './type.component.html',
  styleUrl: './type.component.css',
})
export class TypeComponent {
  constructor(public shareDataSearchService: ShareDataSearchService) {}
}
