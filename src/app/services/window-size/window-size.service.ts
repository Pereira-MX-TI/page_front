import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {

  constructor(private breakpointObserver: BreakpointObserver) 
  {}

  checkMaxScreenSize(sizeValidate:number):boolean
  {
    if(this.breakpointObserver.isMatched("(max-width: "+sizeValidate.toString()+"px)"))
      return true;

    return false;
  }

  checkMinScreenSize(sizeValidate:number):boolean
  {
    if(this.breakpointObserver.isMatched("(min-width: "+sizeValidate.toString()+"px)"))
      return true;

    return false;
  }
}
