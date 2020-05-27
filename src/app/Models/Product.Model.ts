
export class Product
{
    // Id:number;
    // Name:string;
    // Description:string;
    // BillingAddress:string;
    // UnitPrice:number;
    // Category:string;
    // Quantity:number;
    // ImageFile:File;
    // TC:string;
    // SellerId:number;
    // SellerName:string;

    category: string;
    id: number;    ​​
    name: string;    ​​
    pic: string;    ​​
    qty: number;
    Quantity: number;
    price: number;
    // price: number;    ​​
    //discount:number;    ​​

    constructor(productRes:any){
        this.category = productRes.category;
        this.id = productRes.id;
        this.name = productRes.name;      ​​
        this.pic = productRes.pic;
        ​​this.qty = productRes.qty;
​​  }
}