import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../Models/Product.Model';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css', '../shopping/shopping.component.css']
})
export class ShoppingCartComponent implements OnInit {

  productAddedTocart:Product[];
  finalInfo:any ;
  cartItemCount: number ;

  fee:number = 40;
  totItems:number = 0
  totCost:number = 0;
  totFee:number = 0;

  constructor(private _cart:CartService, private _product:ProductsService,private _auth:AuthService,private _router:Router) { }

  ngOnInit() {
    $.getScript('../../assets/js/custom.js');

    this.getCartItems();
    //   this.productAddedTocart=this._cart.getProductFromCart();

    //   for (let i in this.productAddedTocart) {
    //     this.productAddedTocart[i].Quantity= 1;

    //     this.totCost = this.totCost + this.productAddedTocart[i].price * this.productAddedTocart[i].Quantity;
    //   }
    //  // console.log(this.productAddedTocart)

    //   if (this.productAddedTocart == null) {

    //   }else{
    //     this.totItems = this.productAddedTocart.length;
    //   }
      
    //   this.totFee = this.totCost + this.fee;
  }


  getCartItems(){
    this.productAddedTocart=this._cart.getProductFromCart();

    const ids = []

    if (this.productAddedTocart !== null && this.productAddedTocart.length > 0 ) {

      for (let i in this.productAddedTocart) {
        this.productAddedTocart[i].Quantity= 1;
        ids.push(this.productAddedTocart[i].id)
      }

      this._product.getitemsbyids(ids)
        .subscribe(
            res=>{
              console.log(res);
              for (let i = 0; i < res.length; i++) {
                for (let j = 0; j < this.productAddedTocart.length; j++) {
                  if (this.productAddedTocart[j].id == res[i].id) {
                    this.productAddedTocart[j].price = res[i].price;
                  }              
                }
              };

              for (let i in this.productAddedTocart) {
                this.productAddedTocart[i].Quantity= 1;
          
                this.totCost = this.totCost + this.productAddedTocart[i].price * this.productAddedTocart[i].Quantity;
              }
          
              if (this.productAddedTocart == null) {
          
              }else{
                this.totItems = this.productAddedTocart.length;
              }
              
              this.totFee = this.totCost + this.fee;
            },
            err=>console.log(err)
        )
    }
    

  }

  cal( event , id){
      let count 

      if (event.target.className == 'minus') {
          const input = event.target.nextElementSibling
          count = parseInt(input.value)
          if(count != 0 ){
              count = count - 1 ;
              input.value = count

              this.calcTot(id, count)
            }
      } else if(event.target.className == 'plus'){
          const input = event.target.previousElementSibling
          count = parseInt(input.value)
          let max = event.target.parentElement.childNodes[0].value

          if ( max > count) {
              count = count + 1 ;
              input.value = count;
              
              this.calcTot(id, count)
          }
      }
  }

  calcTot(id ,count){
    this.totCost = 0;
    this.totFee= 0;

    for (let i in this.productAddedTocart) {
          if (this.productAddedTocart[i].id == id) {
              this.productAddedTocart[i].Quantity=  count;
          }
          this.totCost = this.totCost + this.productAddedTocart[i].price * this.productAddedTocart[i].Quantity;
      }

      this.totItems = this.productAddedTocart.length;
      this.totFee = this.totCost + this.fee;
  }

  removeAll(){
    this.totCost = 0;
    this.totItems = 0;
    this.totFee= 0;

    this._cart.removeAllProductFromCart();
    this.getCartItems();
    this._cart.updateCartCount(0);// update cart count
  }

  proceedOrder(){
    if (this._auth.loggedIn()) {
      const xd = []

      const user = this._auth.decode();
      const userId = user.subject[0].userName

      xd.push({ userId : userId , cost : this.totFee})
  
      for (let i = 0; i < this.productAddedTocart.length; i++) {
        xd.push( this.productAddedTocart[i] )
      }
      this._product.productsOrder(xd)
          .subscribe(
            res=>{
               console.log(res)
               this.removeAll()
            },
            err=>console.log(err)
          )
    }else{
        alert('Login first');
        this._auth.removeToken();
        this._auth.getLoginStatus(true);
        this._router.navigate(['/login'])
    }
    
  }

}



