import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/products.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productDetails:any = {}
  tags:any ;

  productId:string;
  addTag:string;
  selectedFile:File = null;
  imgURL: any;
  public message: string;
  public imagePath;

  constructor(private Activatedroute:ActivatedRoute,private _product:ProductsService,private renderer:Renderer2) { }

  ngOnInit() {
      this.Activatedroute.queryParams.subscribe(queryParams => {
          this.productId = queryParams['id']
          this.getProductDetails(this.productId)
          
      });
  }

  getProductDetails(id){
    this._product.getProductDetails(id)
        .subscribe(
          res=>{
            console.log(res),
            this.productDetails = res[0];
            this.imgURL = "http://localhost:3000/api/uploads/products/"+this.productDetails['pic']
            this.tags = this.productDetails['tags'].split(",")
            console.log(this.tags)
          },
          err=>console.log(err)
        )
  } 

  updateProdcutsDetails(){
    this._product.updateProdcutsDetails(this.productDetails)
        .subscribe(
          res=>console.log(res),
          err=>console.log(err)
        )
  }
  updateProductTags(){
     //newTagList = [];
    let newTagList = this.tags.slice(0)

    if (this.addTag != null && this.addTag != '' ) {
      newTagList.push(this.addTag);
    }
    // console.log(newTagList.join(","));
    this._product.updateProductTags(newTagList.join(","),this.productDetails['id'])
      .subscribe(
          res=>{
            this.productDetails['tags'] = res[0]['tags'];
            this.tags = this.productDetails['tags'].split(",");
          },
          err=>console.log(err)
      )
  }
  
  changeProductVisibilty(event){
    const hasClass = event.target.parentElement.classList.contains('active');

    if(hasClass ) {
      this.renderer.removeClass(event.target.parentElement,'active');
      this.productDetails['visible'] = 0;
    } else {
      this.renderer.addClass(event.target.parentElement,'active');
      this.productDetails['visible'] = 1;
    }

  }

  changeDiscountOnOff(event){
    const hasClass = event.target.parentElement.classList.contains('active');

    if(!hasClass) {
      this.productDetails['discountOn'] = 1;
      this.renderer.addClass(event.target.parentElement,'active');
      this.renderer.setAttribute(event.target.parentElement.nextElementSibling,'readonly','true');
    } else {
      this.productDetails['discountOn'] = 0;
      this.renderer.removeClass(event.target.parentElement,'active');
      this.renderer.removeAttribute(event.target.parentElement.nextElementSibling,'readonly');
    }
  }



  updateProductImg(){
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append('image', this.selectedFile , this.selectedFile.name);
      fd.append('prodcutId', this.productDetails['id']);
      this._product.updateProductImg(fd)
        .subscribe(
          event => {
            if(event.type === HttpEventType.UploadProgress){
              console.log('Upload Progress : '+ Math.round(event.loaded / event.total *100 ) + '%')
            }else if (event.type === HttpEventType.Response) {
              console.log(event);
              this.imgURL = null;
            }
          },
          err=> console.log(err)
        )
    } else {
        this.message = 'Pick a photo!'
    } 
}

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile , this.selectedFile.name);
    fd.append('username', 'Chris');
    this._product.uploadProductImg(fd)
      .subscribe(
        event => {
          if(event.type === HttpEventType.UploadProgress){
            console.log('Upload Progress : '+ Math.round(event.loaded / event.total *100 ) + '%')
          }else if (event.type === HttpEventType.Response) {
            console.log(event)
          }
        },
        err => console.log(err)
      )
}

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        if (this.imgURL) {
          this.imgURL = null;
        }
        return;
    }
  
    if (this.message) {
      this.message = null;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
}



    removeTagFromArray(tagIndex){
        console.log(tagIndex);

        const index = this.tags.indexOf(tagIndex);
        if (index > -1) {
          this.tags.splice(index, 1);
        }

        console.log(this.tags)
    }

}
