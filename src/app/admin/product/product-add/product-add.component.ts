import { Component, OnInit, Renderer2 } from "@angular/core";
import { HttpEventType } from "@angular/common/http";
import { ProductsService } from "src/app/products.service";

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: [
    "./product-add.component.css",
    "../../../shopping/shopping.component.css",
  ],
})
export class ProductAddComponent implements OnInit {
  addProductDetails = {};

  selectedFile: File = null;
  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private _product: ProductsService, private renderer: Renderer2) {}

  ngOnInit() {
    this.addProductDetails["visible"] = 0;
    this.addProductDetails["discountOn"] = 0;
  }

  addProduct() {
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);

      for (var key in this.addProductDetails) {
        fd.append(key, this.addProductDetails[key]);
      }
      this._product.addProduct(fd).subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log(
              "Upload Progress : " +
                Math.round((event.loaded / event.total) * 100) +
                "%"
            );
          } else if (event.type === HttpEventType.Response) {
            console.log(event);
            this.addProductDetails = {};
            this.imgURL = null;
          }
        },
        (err) => console.log(err)
      );
    } else {
      this.message = "Pick a photo!";
    }
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
  onUpload() {
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    fd.append("username", "Chris");
    this._product.uploadProductImg(fd).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(
            "Upload Progress : " +
              Math.round((event.loaded / event.total) * 100) +
              "%"
          );
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      },
      (err) => console.log(err)
    );
  }

  preview(files) {
    if (files.length === 0) return;

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
    };
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

  changeProductVisibilty(event) {
    const hasClass = event.target.parentElement.classList.contains("active");

    if (hasClass) {
      this.renderer.removeClass(event.target.parentElement, "active");
      this.addProductDetails["visible"] = 0;
    } else {
      this.renderer.addClass(event.target.parentElement, "active");
      this.addProductDetails["visible"] = 1;
    }
  }

  changeDiscountOnOff(event) {
    const hasClass = event.target.parentElement.classList.contains("active");

    if (!hasClass) {
      this.addProductDetails["discountOn"] = 1;
      this.renderer.addClass(event.target.parentElement, "active");
      this.renderer.setAttribute(
        event.target.parentElement.nextElementSibling,
        "readonly",
        "true"
      );
    } else {
      this.addProductDetails["discountOn"] = 0;
      this.renderer.removeClass(event.target.parentElement, "active");
      this.renderer.removeAttribute(
        event.target.parentElement.nextElementSibling,
        "readonly"
      );
    }
  }
}
