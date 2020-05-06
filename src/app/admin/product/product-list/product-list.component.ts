import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList = []

  constructor(private _product: ProductsService,private renderer: Renderer2) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this._product.getAllProducts()
        .subscribe(
          res=> {
            console.log(res),
            this.productList = res
          },
          err=> console.log(err)
        )
  }

  // changeButton(event){
  // //   $('.toggle-btn').click(function(){
    
  // //     $(this).toggleClass(".toggle-btn active");
      
  // // });
  //    event.srcElement.parentElement.classList.add("toggle-btn active")
  //    //console.log(event.srcElement.parentElement)
  // }

  // toggleClass(event) {
  //   const hasClass = event.target.parentElement.classList.contains('active');
  //   if(hasClass) {
  //     this.renderer.removeClass(event.target.parentElement,'active');
  //   } else {
  //     this.renderer.addClass(event.target.parentElement,'active');
  //   }
  // }

  toggleClass2(event,res) {
    // console.log(event)
     const hasClass = event.target.parentElement.classList.contains('active');
     //console.log(hasClass)
     if(hasClass && res=='hidden') {
       this.renderer.removeClass(event.target.parentElement,'active');
     } else {
       this.renderer.addClass(event.target.parentElement,'active');
     }
   }

  changeProductVisibilty(event: any,id){
    if(confirm("Are you sure want to enable/disable ? ")) {
      this._product.changeProductVisibilty(id)
      .subscribe(
        res=> {
          console.log('sxza : '+res)
          this.toggleClass2(event,res)
        },
        err=> console.log(err)
      )
    }
  }

  changeProductDiscountOnOff(event: any,id){
    if(confirm("Are you sure want to enable/disable ? ")) {
      this._product.changeProductDiscountOnOff(id)
      .subscribe(
        res=> {
          this.toggleClass2(event,res)
        },
        err=> console.log(err)
      )
    }
  }

  

}
