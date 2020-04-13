import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AdminComponent } from './admin/admin.component';
import { ProductAddComponent } from './admin/product/product-add/product-add.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { ProductViewComponent } from './admin/product/product-view/product-view.component';
import { EditHomeComponent } from './admin/appearance/edit-home/edit-home.component';

//servicess
import { ProductsService } from './products.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingComponent,
    AdminComponent,
    ProductListComponent,
    ProductAddComponent,
    EditHomeComponent,
    ProductViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
