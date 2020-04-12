import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url:string = "http://localhost:3000/api/"

  private _getItemsUrl = this.url+"getItems";
  private _getMainCategoryProductsUrl = this.url+"getMainCategoryProducts";
  private _getAllProductsUrl = this.url+"getAllProducts";
  private _addProductUrl = this.url+"addProduct";
  private _uploadProductImgUrl = this.url+"profile"

  constructor( private http: HttpClient) { }

  getMainCategoryProducts(category){
    return this.http.get<any> (this._getMainCategoryProductsUrl,{ params : { category : category }})
  }
  getAllProducts(){
    return this.http.get<any> ( this._getAllProductsUrl)
  }
  getItems(shop){
    return this.http.get<any> (this._getItemsUrl,{ params : { category : shop }})
  }
  addProduct(details){
    return this.http.post<any>( this._addProductUrl,details , {
      reportProgress : true,
      observe: 'events'
    })
  }
  uploadProductImg(img){
    return this.http.post<any>( this._uploadProductImgUrl, img , {
      reportProgress : true,
      observe: 'events'
    })
  }


}
