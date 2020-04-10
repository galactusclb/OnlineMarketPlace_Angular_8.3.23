import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import * as $ from '../../assets/js/custom.js';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  shopType:any;

  constructor(private Activatedroute:ActivatedRoute ) { }

    ngOnInit() {
      $.getScript('../../assets/js/custom.js');
      this.shopType = this.Activatedroute.snapshot.queryParams['shop']
  }

}
