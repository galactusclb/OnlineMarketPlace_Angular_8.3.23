import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url:string = "http://localhost:3000/api/"

  private _getItemsUrl = this.url+"getItems";
  private _getProductDetailsHistoryUrl = this.url+"getProductDetailsHistory";
  private _getProductDetailsUrl = this.url+"getProductDetails";
  private _getMainCategoryProductsUrl = this.url+"getMainCategoryProducts";
  private _mainSearchProductsUrl = this.url+"mainSearchProducts";
  private _getAllProductsUrl = this.url+"getAllProducts";
  private _addProductUrl = this.url+"addProduct";
  private _updateProductImgUrl = this.url+"updateProductImg";
  private _updateProdcutsDetailsUrl = this.url+"updateProdcutsDetails";
  private _updateProductTagsUrl = this.url+"updateProductTags";
  private _removeProductFromHomeUrl = this.url+"removeProductFromHome"
  private _addMainCategoryProductsUrl = this.url+"addMainCategoryProducts";
  private _uploadProductImgUrl = this.url+"profile"
  private _productsOrderUrl = this.url+"productsOrder"
  private _getOrderListUrl = this.url+"getOrderList"
  private _getOrderByTrackIdUrl = this.url+"getOrderByTrackId"
  private _getOrderDetailsByTrackIdUrl = this.url+"getOrderDetailsByTrackId"
  private _ordersStatusChangeUrl = this.url+"orderStatusChange";
  private _updateProductVisibiltyUrl = this.url+"updateProductVisibilty"
  private _updateProductDiscountOnOffUrl = this.url+"updateProductDiscountOnOff"

  constructor( private http: HttpClient) { }

  getMainCategoryProducts(category){
    return this.http.get<any> (this._getMainCategoryProductsUrl,{ params : { category : category }})
  }
  mainSearchProducts(details){
    //return this.http.get<any>(this._mainSearchProductsUrl,{ params : details })
    return this.http.get<any>(this._mainSearchProductsUrl,{ params : { details : details } })
  }
  getAllProducts(){
    return this.http.get<any> ( this._getAllProductsUrl)
  }
  getItems(shop){
    return this.http.get<any> (this._getItemsUrl,{ params : { category : shop }})
  }
  getProductDetails(id){
    return this.http.get<any> (this._getProductDetailsUrl,{ params : { productId : id }})
  }
  getProductDetailsHistory(id){
    return this.http.get<any> (this._getProductDetailsHistoryUrl,{ params : { productId : id }})
  }
  addProduct(details){
    return this.http.post<any>( this._addProductUrl,details , {
      reportProgress : true,
      observe: 'events'
    })
  }
  updateProductImg(details){
    return this.http.post<any>( this._updateProductImgUrl,details , {
      reportProgress : true,
      observe: 'events'
    })
  }
  updateProdcutsDetails(details){
    return this.http.post<any> (this._updateProdcutsDetailsUrl,details)
  }
  updateProductTags(tags,id){
    return this.http.post<any> (this._updateProductTagsUrl,{ params : { tags : tags , id : id } })
    //return this.http.get<any>(this._mainSearchProductsUrl,{ params : details })
    //return this.http.get<any>(this._mainSearchProductsUrl,{ params : { tags : tags } })
  }
  changeProductVisibilty(id){
    return this.http.post<any>(this._updateProductVisibiltyUrl, { params : { productId : id }})
  }
  changeProductDiscountOnOff(id){
    return this.http.post<any>(this._updateProductDiscountOnOffUrl, { params : { productId : id }})
  }
  addMainCategoryProducts(product){
    return this.http.post<any>(this._addMainCategoryProductsUrl,product);
  }

  changeStatus(newStatus,id){
    return this.http.post<any>(this._ordersStatusChangeUrl,{params : { sid : id  , status : newStatus } });
  }

  removeProductFromHome(id){
    console.log('delete this '+ id)
    return this.http.post<any>(this._removeProductFromHomeUrl, { params : { item : id }})
  }
  uploadProductImg(img){
    return this.http.post<any>( this._uploadProductImgUrl, img , {
      reportProgress : true,
      observe: 'events'
    })
  }


  productsOrder(details){
    return this.http.post<any> ( this._productsOrderUrl , { params : { orders : details }});
  }


  getOrderList(){
    return this.http.get<any> ( this._getOrderListUrl);
  }
  getOrderByTrackId(id){
    console.log(id)
    return this.http.get<any>( this._getOrderByTrackIdUrl , { params : { trackId : id }})
  }
  getOrderDetailsByTrackId(id){
    console.log(id)
    return this.http.get<any>( this._getOrderDetailsByTrackIdUrl , { params : { trackId : id }})
  }
}
