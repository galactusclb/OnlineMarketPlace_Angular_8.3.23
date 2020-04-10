import { Component, OnInit } from '@angular/core';

declare const hide_open: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.getScript('../../assets/js/custom.js');
  }


  // onClick() {
  //   hide_open();
  // }
  
}
