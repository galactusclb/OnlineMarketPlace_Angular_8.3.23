import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "../products.service";
import { CartService } from "../cart.service";
import { Product } from "../Models/Product.Model";

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.baseUrl;

@Component({
  selector: "app-catalog-search",
  templateUrl: "./catalog-search.component.html",
  styleUrls: [
    "./catalog-search.component.css",
    "../shopping/shopping.component.css",
  ],
})
export class CatalogSearchComponent implements OnInit {
  url = BACKEND_URL;

  productAddedTocart: Product[];
  products = [];

  searchQuery: any;
  shopTypeTitle: any;
  cartItemCount: number;

  constructor(
    private Activatedroute: ActivatedRoute,
    private _product: ProductsService,
    private _cart: CartService
  ) {}

  ngOnInit() {
    this.Activatedroute.queryParams.subscribe((queryParams) => {
      this.searchQuery = queryParams["q"];
      this.getitems(this.searchQuery);
      this.shopTypeTitle = this.searchQuery.split(/(?=[A-Z])/).join(" ");
    });
  }

  getitems(shop) {
    this._product.mainSearchProducts(shop).subscribe(
      (res) => {
        this.products = res;
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  cal(event) {
    let count;

    if (event.target.className == "minus") {
      const input = event.target.nextElementSibling;
      count = parseInt(input.value);
      if (count != 0) {
        count = count - 1;
        input.value = count;
      }
    } else if (event.target.className == "plus") {
      const input = event.target.previousElementSibling;
      count = parseInt(input.value);
      let max = event.target.parentElement.childNodes[0].value;

      if (max > count) {
        count = count + 1;
        input.value = count;
      }
    }
  }

  OnAddCart(product: Product) {
    console.log(product["id"]);

    console.log(product);

    this.productAddedTocart = this._cart.getProductFromCart();
    if (this.productAddedTocart == null) {
      this.productAddedTocart = [];
      this.productAddedTocart.push(product);
      this._cart.addProductToCart(this.productAddedTocart);
    } else {
      var index = this.productAddedTocart.findIndex((x) => x.id == product.id);
      if (index === -1) {
        this.productAddedTocart.push(product);
        this._cart.addProductToCart(this.productAddedTocart);
      } else {
        console.log("Already added");
      }
    }

    this.cartItemCount = this.productAddedTocart.length;
    this._cart.updateCartCount(this.cartItemCount);
  }
}
