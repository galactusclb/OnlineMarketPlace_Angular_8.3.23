import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList = []

  p:number = 1;
  noOfProd:number = 10;
  prodCount:number = 15;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;

  public labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
};

  constructor(private _product: ProductsService,private _auth:AuthService, private renderer: Renderer2,private _router:Router) { }

  ngOnInit() {
    this.getAllProducts();
    this.getPermision();
  }

  getPermision(){
    this._auth.getPermisionUser()
      .subscribe(
        res=>{},
        err=> {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._auth.removeToken()
              this._auth.getLoginStatus(true);
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

  getAllProducts(){
    this._product.getAllProducts()
        .subscribe(
          res=> {
            console.log(res),
            this.productList = res
          },
          err=> {
            console.log(err);
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this._router.navigate(['/login'])
              }
            }
          }
        )
  }

  toggleClass2(event,res) {
     const hasClass = event.target.parentElement.classList.contains('active');

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
