import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.css','../../../home/home.component.css']
})
export class EditHomeComponent implements OnInit {

  prodcutDetails = {}

  category = ['grocery','pets']
  //category:string = 'pets'
  products = []

  status:boolean = false;

  constructor(private _products:ProductsService) { }

  ngOnInit() {
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
  addMainCategoryProducts(){
    this._products.addMainCategoryProducts(this.prodcutDetails)
      .subscribe(
        res=>{
          console.log(res);
          this.products = [];
          for (let i = 0; i < this.category.length; i++) {
            this.getMainCategoryProducts(this.category[i])
          }
        },
        err=>console.log(err)
      )
    console.log(this.prodcutDetails)
  }
  removeProductFromHome(id){
    console.log(id)
    this._products.removeProductFromHome(id)
        .subscribe(
          res=>console.log(res),
          err=>console.log(err)
        )
  }

  addProdcutDiv(){
      this.status = !this.status;
  }
}
