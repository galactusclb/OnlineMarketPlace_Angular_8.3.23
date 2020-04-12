import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList = []

  constructor(private _product: ProductsService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this._product.getAllProducts()
        .subscribe(
          res=> {
            console.log(res),
            this.productList = res
          },
          err=> console.log(err)
        )

  }
}
