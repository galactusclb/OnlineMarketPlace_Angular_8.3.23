import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.css','../../../home/home.component.css','../../../../assets/css/main.css']
})
export class EditHomeComponent implements OnInit {

  prodcutDetails = {}
  categoryDetails = {} 

  //category = ['grocery','pets','health']
  categoryList:any = [];
  //category:string = 'pets'
  products = []

  status:boolean = false;

  constructor(private _products:ProductsService,private renderer: Renderer2) { }

  ngOnInit() {
    // for (let i = 0; i < this.category.length; i++) {
    //   this.getMainCategoryProducts(this.category[i])
    // }
    this.getMainCategoriesList();
    
  }

  getMainCategoriesList(){
    this._products.getMainCategoriesListAdmin()
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
              this.products[i].visible = this.categoryList[i].visibility;
            }
          }
          console.log(this.products)
        },
        err=> console.log(err)
      )
  }
  
  addMainCategoriesTitle(){
    this._products.addMainCategoriesTitle(this.categoryDetails)
      .subscribe(
        res=>{
          console.log(res);
          this.categoryList = [];
          this.products = [];
          this.categoryList = res;
          this.getMainCategoriesList();
        },
        err=>console.log(err)
      )
    console.log(this.categoryDetails)
  }
  addMainCategoryProducts(){
    this._products.addMainCategoryProducts(this.prodcutDetails)
      .subscribe(
        res=>{
          console.log(res);
          this.products = [];
          for (let i = 0; i < this.categoryList.length; i++) {
            this.getMainCategoryProducts(this.categoryList[i])
          }
        },
        err=>console.log(err)
      )
    console.log(this.prodcutDetails)
  }
  removeCategoryFromHome(category){
    console.log(category)
    this._products.removeCategoryFromHome(category)
        .subscribe(
          res=>{
            console.log(res)
            this.getMainCategoriesList()
          },
          err=>console.log(err)
        )
  }
  removeProductFromHome(id){
    console.log(id)
    this._products.removeProductFromHome(id)
        .subscribe(
          res=>console.log(res),
          err=>console.log(err)
        )
  }

  addProdcutDiv(){
      this.status = !this.status;
  }


  changeMainCategoryVisibilty(event: any,category){
    if(confirm("Are you sure want to enable/disable ? ")) {
      console.log(category)
      this._products.changeMainCategoryVisibilty(category)
      .subscribe(
        res=> {
          this.toggleClass2(event,res)
          //console.log('sxza : '+res)
        },
        err=> console.log(err)
      )
    }
  }
  toggleClass2(event,res) {
    const hasClass = event.target.parentElement.classList.contains('active');

    if(hasClass && res=='hidden') {
      this.renderer.removeClass(event.target.parentElement,'active');
    } else {
      this.renderer.addClass(event.target.parentElement,'active');
    }
  }
}
