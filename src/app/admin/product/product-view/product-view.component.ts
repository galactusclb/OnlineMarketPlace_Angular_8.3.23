import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  productId:string;

  constructor(private Activatedroute:ActivatedRoute, private _product: ProductsService) { }

  ngOnInit() {
    this.Activatedroute.queryParams.subscribe(queryParams => {
        this.productId = queryParams['id']
        this.getProductDetails(this.productId);
    });
  }

  getProductDetails(id){
    this._product.getProductDetails(id)
        .subscribe(
          res=>console.log(res),
          err=>console.log(err)
        )
  }
}
