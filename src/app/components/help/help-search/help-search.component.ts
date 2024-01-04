import { Component, OnInit,Renderer2,ViewChild,AfterContentInit} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'help-search',
  templateUrl: './help-search.component.html',
  styleUrls: ['./help-search.component.css']
})
export class HelpSearchComponent implements OnInit {

  viewH:boolean;
  viewV:boolean;

  constructor(private breakpointObserver: BreakpointObserver,private renderer:Renderer2) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.renderer.listen(window,"resize",()=>{
      this.checkScreenSize();
    });
  }

  checkScreenSize():void
  {
    if(this.breakpointObserver.isMatched('(max-width: 850px)'))
    {
      this.viewH=false;
      this.viewV=true;
    }
    else 
    {
      this.viewH=true;
      this.viewV=false;
    }
  }
}
