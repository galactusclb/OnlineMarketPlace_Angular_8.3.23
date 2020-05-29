import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.component.html',
  styleUrls: ['./order-requests.component.css']
})
export class OrderRequestsComponent implements OnInit {

  searchingParam = {}

  orderList: any = [];
  orderListCopy:any = [] 

  p:number = 1;
  prodCount:number = 25;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;

  constructor(private _product:ProductsService,private renderer:Renderer2) { }

  ngOnInit() {
    this.getAllProducts()

    this.searchingParam['status'] = '';
  }


  absoluteIndex(indexOnPage: number): number {
    return this.prodCount * (this.p - 1) + indexOnPage;
  }

  getAllProducts(){
    this._product.getOrderList()
        .subscribe(
          res=> {
            console.log(res),
            this.orderList = res
            this.orderListCopy = res
          },
          err=> console.log(err)
        )

  }
  searchTable(){
    this._product.searchOrderReqTable(this.searchingParam)
    .subscribe(
      res=> {
        console.log(res),
        this.orderList = res
        this.orderListCopy = res
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
      if(confirm("Are you sure want to enable/disable ? ")) {
          const status = event.srcElement.previousElementSibling.value;
          this._product.changeStatus(status,sid)
            .subscribe(
              res=>{
                if (!event.target.classList.contains('hide')) {
                    this.renderer.addClass(event.target,'hide');
                }
              },
              err=>{
                console.log(err)
              }
            )
      }
  }

  
  changeButton(sid,event){
  //   $('.toggle-btn').click(function(){
    
  //     $(this).toggleClass(".toggle-btn active");
      
  // });
      //console.log(sid +" + "+ status )
      //console.log(this.orderList)
      //console.log(this.orderList[i].status)
      for (let i = 0; i < this.orderListCopy.length; i++) {
          if (this.orderListCopy[i].sid == sid ) {
              const hasClass = event.srcElement.nextSibling.classList.contains('hide');

              if (this.orderListCopy[i].status != event.target.value) {
                  if(hasClass) {
                      this.renderer.removeClass(event.srcElement.nextSibling,'hide');
                  }
              }else{
                  if(!hasClass) {
                      this.renderer.addClass(event.srcElement.nextSibling,'hide');
                  }
              }
          }
      }
  }
}
