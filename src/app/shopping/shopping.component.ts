import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService} from '../products.service'
import { CartService } from '../cart.service';
// import * as $ from '../../assets/js/custom.js';

import { Product } from '../Models/Product.Model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  productAddedTocart:Product[];
  products = []

  shopType:any;
  shopTypeTitle:any ;
  cartItemCount: number ;

  constructor(private Activatedroute:ActivatedRoute, private _product:ProductsService, private _cart:CartService ) { }

    ngOnInit() {
      $.getScript('../../assets/js/custom.js');

      //this._cart.currentCart.subscribe(msg => this.cartItemCount = msg);
      
      //this.shopType = this.Activatedroute.snapshot.queryParams['shop']  
      //this.getitems(this.shopType)
      
      this.Activatedroute.queryParams.subscribe(queryParams => {
        this.shopType = queryParams['shop'];
        this.getitems(this.shopType);
        this.shopTypeTitle =  this.shopType.split(/(?=[A-Z])/).join(" ");

        
        // for (let i in this.productAddedTocart) {
        //   this.productAddedTocart[i].Quantity=1;
        // }
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

    showGV(){
      alert("GV: " + this._cart.getMyGV());
    }


    OnAddCart(product:Product){
        console.log(product['id'])
        
        this.productAddedTocart=this._cart.getProductFromCart();

        if (this.productAddedTocart == null) {
            this.productAddedTocart = []
            this.productAddedTocart.push(product)
            this._cart.addProductToCart(this.productAddedTocart)

        } else {
            var index = this.productAddedTocart.findIndex(x => x.id== product.id)
            if (index === -1){
                this.productAddedTocart.push(product)
                this._cart.addProductToCart(this.productAddedTocart)
            }else{
                console.log('Already added')
            }
        }

        this.cartItemCount = this.productAddedTocart.length
        console.log(this.cartItemCount)
        this._cart.updateCartCount(this.cartItemCount);
    }
}
