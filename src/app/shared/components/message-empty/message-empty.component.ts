import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'message-empty',
  templateUrl: './message-empty.component.html',
  styleUrls: ['./message-empty.component.css']
})
export class MessageEmptyComponent implements OnInit {

  @Input() nameRegister = '';
  constructor() { }

  ngOnInit(): void {
  }

}
