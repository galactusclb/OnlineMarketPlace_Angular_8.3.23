import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.component.html',
  styleUrls: ['./order-requests.component.css']
})
export class OrderRequestsComponent implements OnInit {
  orderList: any = []; 

  constructor(private _product:ProductsService) { }

  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts(){
    this._product.getOrderList()
        .subscribe(
          res=> {
            console.log(res),
            this.orderList = res
          },
          err=> console.log(err)
        )

  }

  save(event,sid){
      // const x:boolean = false;
      // console.log(event.target.value + " => original : "+ sid)
      // for (let i = 0; i < this.orderList.length; i++) {
      //     if (this.orderList[i].sid==sid ) {
      //         console.log('Not same ' +  this.orderList[i].status)
      //         if (this.orderList[i].status!=event.target.value) {
      //             console.log('as')
      //         }
      //     }
      // }
  }

  changeStatus(event,sid){
      const status = event.srcElement.previousElementSibling.value;
      this._product.changeStatus(status,sid)
        .subscribe(
          res=>console.log(res),
          err=>console.log(err)
        )
  }

  
  changeButton(){
    $('.toggle-btn').click(function(){
    
      $(this).toggleClass(".toggle-btn active");
      
  });
  }
}
