import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../Models/Product.Model';
import { CartService } from '../cart.service';
import { Config, Menu } from '../extra/accordian-menu/types';

// declare const hide_open: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //categoryList = ['grocery','pets'];
  categoryList:any = [];
  //category:string = 'pets'
  products = []
  productAddedTocart:Product[];
  cartItemCount: number ;

  constructor(private _products: ProductsService, private _cart:CartService ) { }

  ngOnInit() {
    $.getScript('../../assets/js/custom.js');
    
    // this.getMainCategoryProducts(this.category)

    // for (let i = 0; i < this.category.length; i++) {
    //   this.getMainCategoryProducts(this.category[i])
    // }
    this.getMainCategoriesList();
  }

  getMainCategoriesList(){
    this._products.getMainCategoriesList()
      .subscribe(
        res=>{
          //console.log(res)
          this.categoryList = [];
          this.products = [];
          this.categoryList = res;
          console.log(this.categoryList);
          for (let i = 0; i < this.categoryList.length; i++) {
            this.getMainCategoryProducts(this.categoryList[i].category)
          }
          
        },
        err=> console.log(err)
      )
      //console.log(this.products)
  }

  getMainCategoryProducts(category){
    this._products.getMainCategoryProducts(category)
      .subscribe(
        res=> {
          this.products.push(res);
          for (let i = 0; i < this.products.length; i++) {
            if (i == (this.products.length - 1)) {
              this.products[i].title = category;
            }
          }
        },
        err=> console.log(err)
      )
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
