import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList: any = [];

  username:any ;

  p:number = 1;
  prodCount:number = 25;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;

  constructor(private _prod:ProductsService,private _auth:AuthService,private _router:Router) { }

  ngOnInit() {
    this.getUser();
    this.getOrderByUserId();
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

  getUser(){
    if (this._auth.loggedIn()) {
      const user = this._auth.decode();
      this.username = user.subject[0].userName
    }
  }
  getOrderByUserId(){
    this._prod.getOrderByUserId(this.username)
      .subscribe(
        res=> {
          console.log(res),
          this.orderList = res
        },
        err=> console.log(err)
      )
  }

}
