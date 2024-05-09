import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NavegationService } from '@services/navegation/navegation.service'

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.css'],
})
export class PageErrorComponent implements OnInit {
  case: Number
  title: String

  constructor(
    private objRouter: Router,
    private objNavegationService: NavegationService,
  ) {
    this.case = 0
    switch (this.case) {
      case 0:
        this.title = 'Página no encontrada'
        break
    }

    /*
    if(!objRouter.url.includes("error"))
      this.objNavegationService.navegatePage('Error');*/
  }

  ngOnInit(): void {}
}
