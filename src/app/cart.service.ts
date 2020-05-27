import { Injectable } from '@angular/core';
import { Observable,Subject,BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  myGlobalVar;
  cartArray = []
  
  private subject = new Subject<any>();
  private currentCartCount = new BehaviorSubject(0);

  currentCart = this.currentCartCount.asObservable();

  constructor(){
    this.myGlobalVar = true;
    //alert("My intial global variable value is: " + this.myGlobalVar);
  }

  sendMessage(message: string){
    this.subject.next({ text: message});
  }

  clearMessages(){
    this.subject.next()
  }

  getMessage(): Observable<any>{
    return this.subject.asObservable();
  }




  setMyGV(val: boolean){
    this.myGlobalVar = val;
  }

  getMyGV(){
    return this.myGlobalVar;
  }


  



  //cart 
  addProductToCart(prodcuts: any) {
    localStorage.setItem("product", JSON.stringify(prodcuts));
  }
  getProductFromCart() {
    return JSON.parse(localStorage.getItem('product'));
  }
  removeAllProductFromCart(){
    localStorage.removeItem("product");
  }
  getCartCount(){
    let count = 0;
    //console.log(this.getProductFromCart())
    if (this.getProductFromCart() != null ) {
      const productAddedTocart=this.getProductFromCart();
      count = productAddedTocart.length
    }
    return count;
  }
  updateCartCount(count: number) {
    this.currentCartCount.next(count)
  }
  
}
