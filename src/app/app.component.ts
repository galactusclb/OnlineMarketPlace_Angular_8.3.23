import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CartService } from "./cart.service";
import { AuthService } from "./services/auth.service";
import { ProductsService } from "./products.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnDestroy {
  title = "OnlineMarketPlace";

  searchingDetails = {};

  message: any[] = [];
  subscription: Subscription;

  cartItemCount: number = 0;

  CurrentLogStatus: boolean = false;
  role: boolean = false;

  username: string = "";
  currentRole: string = "";

  constructor(
    private _cart: CartService,
    public _auth: AuthService,
    private _prod: ProductsService,
    private _router: Router
  ) {
    this._cart.currentCart.subscribe((msg) => (this.cartItemCount = msg));
    this.cartItemCount = this._cart.getCartCount();

    this._auth.newLoginStatus.subscribe((status) => {
      if (status == true) {
        this.displayUser();
        this.checkRole();
      }
    });

    // this.subscription = this._cart.getMessage().subscribe( message =>{
    //   if (message) {
    //     this.message.push(message)
    //     console.log(this.message)
    //   } else {
    //     this.message = [];
    //   }
    // })
  }

  ngOnInit() {
    this.checkRole();
    this.displayUser();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  displayUser() {
    if (this._auth.loggedIn()) {
      const user = this._auth.decode();
      this.currentRole = user.subject[0].designation;
      this.username = user.subject[0].userName;
      console.log("user name : " + this.username);
    }
  }

  checkRole() {
    this.role = this._auth.checkAuthorization();
  }

  searchProducts() {
    //console.log(this.searchingDetails)
    // this._prod.mainSearchProducts(this.searchingDetails)
    //   .subscribe(
    //     res => {
    //       console.log(res)
    //     },
    //     err => console.log(err)
    //   )
  }
  searchProductRoute() {
    this._router.navigate(["/catalogsearch"], {
      queryParams: { q: this.searchingDetails["title"] },
    });
  }
}
