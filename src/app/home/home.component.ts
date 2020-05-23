import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

// declare const hide_open: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //categoryList = ['grocery','pets'];
  categoryList:any = [];
  //category:string = 'pets'
  products = []

  constructor(private _products: ProductsService) { }

  ngOnInit() {
    $.getScript('../../assets/js/custom.js');
    
    // this.getMainCategoryProducts(this.category)

    // for (let i = 0; i < this.category.length; i++) {
    //   this.getMainCategoryProducts(this.category[i])
    // }
    this.getMainCategoriesList();
  }

  getMainCategoriesList(){
    this._products.getMainCategoriesList()
      .subscribe(
        res=>{
          //console.log(res)
          this.categoryList = [];
          this.products = [];
          this.categoryList = res;
          console.log(this.categoryList);
          for (let i = 0; i < this.categoryList.length; i++) {
            this.getMainCategoryProducts(this.categoryList[i].category)
          }
          
        },
        err=> console.log(err)
      )
      //console.log(this.products)
  }

  getMainCategoryProducts(category){
    this._products.getMainCategoryProducts(category)
      .subscribe(
        res=> {
          this.products.push(res);
          for (let i = 0; i < this.products.length; i++) {
            if (i == (this.products.length - 1)) {
              this.products[i].title = category;
            }
          }
        },
        err=> console.log(err)
      )
  }
  
}
