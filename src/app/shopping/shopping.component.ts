import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService} from '../products.service'
import { CartService } from '../cart.service';
// import * as $ from '../../assets/js/custom.js';

import { Config, Menu } from '../extra/accordian-menu/types';
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

      });
    }

    getitems(shop){
      this._product.getItems(shop)
        .subscribe(
          res => {
            this.products = res

            for (let i = 0; i < res.length; i++) {
              for (let j = 0; j < this.products.length; j++) {
                if (this.products[j].id == res[i].id) {
                  this.products[j].price = res[i].price;
                  this.products[j].discount = res[i].discount;

                  const price = this.products[j].price;
                  const discount = this.products[j].discount;
                  let discountPrice: number = price;
                  if (this.products[j].discountOn) {
                     discountPrice = price - (price * discount/100)                    
                  }

                  this.products[j].discountPrice = discountPrice;
                }              
              }
            };
          },
          err => console.log(err)
        )
    }

    showGV(){
      alert("GV: " + this._cart.getMyGV());
    }


    cal( event){
      let count 

      if (event.target.className == 'minus') {
          const input = event.target.nextElementSibling
          count = parseInt(input.value)
          if(count != 0 ){
              count = count - 1 ;
              input.value = count
            }
      } else if(event.target.className == 'plus'){
          const input = event.target.previousElementSibling
          count = parseInt(input.value)
          let max = event.target.parentElement.childNodes[0].value

          if ( max > count) {
              count = count + 1 ;
              input.value = count;
          }
      }
  }


    OnAddCart(product:Product){

        let prod = new Product(product)
        console.log(prod)
        // console.log(product['id'])
        
        // console.log(product)

        
        this.productAddedTocart=this._cart.getProductFromCart();
        if (this.productAddedTocart == null) {
            this.productAddedTocart = []
            this.productAddedTocart.push(prod)
            this._cart.addProductToCart(this.productAddedTocart)
        } else {
            var index = this.productAddedTocart.findIndex(x => x.id== prod.id)
            if (index === -1){
                this.productAddedTocart.push(prod)
                this._cart.addProductToCart(this.productAddedTocart)
            }else{
                console.log('Already added')
            }
        }

        this.cartItemCount = this.productAddedTocart.length
        this._cart.updateCartCount(this.cartItemCount);
    }




    options: Config = { multi: false };
  
    menus: Menu[] = [
      { 
        name: 'Grocery',
        url: 'grocery',
        iconClass: 'fa fa-carrot',
        active: false,
        submenu: [
          { name: 'Fresh Fruits', url: 'grocery' },
          { name: 'Fresh Vegetables', url: '' },
          { name: 'Fresh Dairy', url: '' },
          { name: 'Food grains & Oil', url: '' },
          { name: 'Meats, Egg & Fish', url: '' },
          { name: 'Spices', url: '' },
          { name: 'Snacks & Branded Food', url: '' },
          { name: 'Bakery & Cake', url: '' }
        ]
      },
      { 
        name: 'Beauty & Health',
        url: 'beautyAndHealth',
        iconClass: 'fa fa-mortar-pestle',
        active: false,
        submenu: [
          { name: 'Tablets', url: '#' },
          { name: 'Mobiles', url: '#' },
          { name: 'Desktop', url: '#' }
        ]
      },
      { 
        name: 'Home & Kitchen',
        url: 'homeAndKitchen',
        iconClass: 'fas fa-blender',
        active: false,
        submenu: [
          { name: 'Chrome', url: '#' },
          { name: 'Firefox', url: '#' },
          { name: 'Desktop', url: '#' }
        ]
      },
      { 
        name: 'Pets items',
        url: 'pets',
        iconClass: 'fas fa-paw',
        active: false,
        submenu: [
          { name: 'Chrome', url: '#' },
          { name: 'Firefox', url: '#' },
          { name: 'Desktop', url: '#' }
        ]
      }
    ];
}
