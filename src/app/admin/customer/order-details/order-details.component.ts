import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css','../order-requests/order-requests.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderDetails:any =[]
  orderList:any = []

  uid:any 
  totPrice:number
  date:any
  status:any

  trackId:any

  constructor(private Activatedroute: ActivatedRoute,private _product:ProductsService) { }

  ngOnInit() {

    this.Activatedroute.queryParams.subscribe(queryParams => {
      this.trackId = queryParams['trackId'];
      this._product.getOrderByTrackId(this.trackId)
          .subscribe(
            res=>{
              console.log(res),
              //this.orderDetails = res
              this.totPrice = res[0].totPrice
              this.date= res[0].date
              this.status= res[0].status
            },
            err=>console.log(err)
          )
      this._product.getOrderDetailsByTrackId(this.trackId)
          .subscribe(
            res=>{
              console.log(res[0])
              this.orderList = res[0]
              this.uid = res[0].uid
            },
            err=>console.log(err)
          )
    });
  }

}
