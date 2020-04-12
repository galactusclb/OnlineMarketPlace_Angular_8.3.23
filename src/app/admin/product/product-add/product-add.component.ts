import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css','../../../shopping/shopping.component.css']
})
export class ProductAddComponent implements OnInit {

  addProductDetails = {}

  selectedFile:File = null;

  constructor(private _product : ProductsService) { }

  ngOnInit() {
  }

  addProduct(){
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append('image', this.selectedFile , this.selectedFile.name);

      for(var key in this.addProductDetails){
        fd.append(key , this.addProductDetails[key])
      }
      this._product.addProduct(fd)
        .subscribe(
          event => {
            if(event.type === HttpEventType.UploadProgress){
              console.log('Upload Progress : '+ Math.round(event.loaded / event.total *100 ) + '%')
            }else if (event.type === HttpEventType.Response) {
              console.log(event)
            }
          },
          err=> console.log(err)
        )
    } else {
        console.log("Pick a photo!")
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
public imagePath;
imgURL: any;
public message: string;

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

    // onFileUpload(){
  //   const imageBlop = this.fileInput.nativeElement.files[0];
  //   const file = new FormData();
  //   file.set('file', imageBlop);

  //   this._product.uploadProductImg(file)
  //     .subscribe(
  //       res=> console.log(res),
  //       err => console.log(err)
  //     )
  // }
}
