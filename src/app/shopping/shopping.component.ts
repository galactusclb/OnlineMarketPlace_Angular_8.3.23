import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService} from '../products.service'
// import * as $ from '../../assets/js/custom.js';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  products = []

  shopType:any;
  shopTypeTitle:any ;

  constructor(private Activatedroute:ActivatedRoute, private _product:ProductsService ) { }

    ngOnInit() {
      $.getScript('../../assets/js/custom.js');

      //this.shopType = this.Activatedroute.snapshot.queryParams['shop']  
      //this.getitems(this.shopType)
      
      this.Activatedroute.queryParams.subscribe(queryParams => {
        this.shopType = queryParams['shop'];
        this.getitems(this.shopType);
        this.shopTypeTitle =  this.shopType.split(/(?=[A-Z])/).join(" ");
        // console.log(this.shopTypeTitle)
      });
  }

    getitems(shop){
      this._product.getItems(shop)
        .subscribe(
          res => {
            this.products = res
          },
          err => console.log(err)
        )
    }
}
