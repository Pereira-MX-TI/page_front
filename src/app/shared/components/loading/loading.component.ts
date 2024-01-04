import { Component, OnInit } from '@angular/core';

import { ShareInformationService } from './../../../services/share-information.service';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  statusView:boolean
  image:string;
  constructor(private objShareInformationService:ShareInformationService) {
    //this.image="url('../../../../assets/loading.GIF')";
  }

  ngOnInit(): void 
  {
    this.objShareInformationService.viewLoading$.subscribe((status:boolean)=>{
      this.statusView=status;

      if(this.statusView)
      {
        //this.image="url('../../../../assets/loading_"+Math.round(Math.random()*4)+".GIF')";
      }
    });
  }
}
