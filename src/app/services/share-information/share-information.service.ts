import { Injectable,EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ShareInformationService 
{
  viewLoading$:EventEmitter<boolean>;

  selectMenuMovil$:EventEmitter<boolean[]>;
  viewBtn$:EventEmitter<boolean[]>;
  viewTabNavBar$:EventEmitter<any[]>;
  openMoreVert$:EventEmitter<void>;

  btnReturn$:EventEmitter<void>;

  search1$:EventEmitter<string>;
  search2$:EventEmitter<string[]>;
  search3$:EventEmitter<string>;


  viewSideNav$:EventEmitter<boolean>;

  reloadSamePage$:EventEmitter<any>;

  manageCarShopping$:EventEmitter<any>;

  constructor() 
  {
    this.viewLoading$ = new EventEmitter<boolean>();

    this.selectMenuMovil$ = new EventEmitter<boolean[]>();
    this.viewBtn$ = new EventEmitter<boolean[]>();
    this.openMoreVert$ = new EventEmitter<void>();

    this.search1$ = new EventEmitter<string>();
    this.search2$ = new EventEmitter<string[]>();
    this.search3$ = new EventEmitter<string>();

    this.btnReturn$ = new EventEmitter<void>();

    this.viewSideNav$ = new EventEmitter<boolean>();
    this.viewTabNavBar$ = new EventEmitter<any[]>();

    this.reloadSamePage$ = new EventEmitter<void>();
    this.manageCarShopping$ = new EventEmitter<any>();

  }
}
