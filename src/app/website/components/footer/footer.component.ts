import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'nav-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  currentDate: Date;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2,
  ) {
    this.currentDate = new Date();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  openPdfPrivace(data: string): void {
    window.open(data, '_blank');
  }
}
