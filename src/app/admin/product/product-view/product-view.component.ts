import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "src/app/products.service";
import { CartService } from "src/app/cart.service";

import { environment } from "../../../../environments/environment";

const BACKEND_URL = environment.baseUrl;
@Component({
  selector: "app-product-view",
  templateUrl: "./product-view.component.html",
  styleUrls: ["./product-view.component.css"],
})
export class ProductViewComponent implements OnInit {
  url = BACKEND_URL;

  productId: string;
  bool: boolean = false;

  productDetails = [];
  productSoldHistoryList = [];

  constructor(
    private Activatedroute: ActivatedRoute,
    private _product: ProductsService,
    private _cart: CartService
  ) {}

  ngOnInit() {
    this.Activatedroute.queryParams.subscribe((queryParams) => {
      this.productId = queryParams["id"];
      this.getProductDetails(this.productId);
    });
  }

  getProductDetails(id) {
    this._product.getProductDetailsHistory(id).subscribe(
      (res) => {
        console.log(res), (this.productDetails = res[0][0]);
        this.productSoldHistoryList = res[1];
      },
      (err) => console.log(err)
    );
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this._cart.sendMessage("Message from Home Component to App Component!");
  }

  clearMessages(): void {
    // clear messages
    this._cart.clearMessages();
  }

  changeGV() {
    this.bool = !this.bool;
    this._cart.setMyGV(this.bool);
  }

  showGV() {
    alert("GV: " + this._cart.getMyGV());
  }
}
