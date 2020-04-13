import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

// declare const hide_open: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  category = ['grocery','pets']
  //category:string = 'pets'
  products = []

  constructor(private _products: ProductsService) { }

  ngOnInit() {
    $.getScript('../../assets/js/custom.js');
    
    // this.getMainCategoryProducts(this.category)

    for (let i = 0; i < this.category.length; i++) {
      this.getMainCategoryProducts(this.category[i])
    }
  }


  getMainCategoryProducts(category){
    this._products.getMainCategoryProducts(category)
      .subscribe(
        res=> {
          this.products.push(res);
          console.log(this.products)
        },
        err=> console.log(err)
      )
  }
  
}
