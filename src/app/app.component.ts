import { Component,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'OnlineMarketPlace';
    
  message: any[] = [];
  subscription: Subscription

  cartItemCount: number = 0;

  constructor(private _cart: CartService){
      this._cart.currentCart.subscribe(msg => this.cartItemCount = msg);
      this.cartItemCount =  this._cart.getCartCount()
      this.subscription = this._cart.getMessage().subscribe( message =>{
        if (message) {
          this.message.push(message)
          console.log(this.message)
        } else {
          this.message = [];
        }
      })
  }

  ngOnDestroy() {
      this.subscription.unsubscribe()
  }
}
