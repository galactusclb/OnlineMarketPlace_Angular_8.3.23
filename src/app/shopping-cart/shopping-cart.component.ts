import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/Product.Model';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';

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

  constructor(private _cart:CartService, private _product:ProductsService) { }

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

    for (let i in this.productAddedTocart) {
      this.productAddedTocart[i].Quantity= 1;

      this.totCost = this.totCost + this.productAddedTocart[i].price * this.productAddedTocart[i].Quantity;
    }

    if (this.productAddedTocart == null) {

    }else{
      this.totItems = this.productAddedTocart.length;
    }
    
    this.totFee = this.totCost + this.fee;
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
    console.log(this.productAddedTocart)
    
    const xd = []
    xd.push( {cost : this.totFee } )

    for (let i = 0; i < this.productAddedTocart.length; i++) {
      xd.push( this.productAddedTocart[i] )
    }

   // this.finalInfo = { cost : this.totFee , items : this.productAddedTocart}
    //console.log(this.productAddedTocart)
    this._product.productsOrder(xd)
        .subscribe(
          res=>{
             console.log(res)
             this.removeAll()
          },
          err=>console.log(err)
        )
  }
}



