import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AdminComponent } from './admin/admin.component';
import { ProductAddComponent } from './admin/product/product-add/product-add.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { ProductEditComponent } from './admin/product/product-edit/product-edit.component';
import { ProductViewComponent } from './admin/product/product-view/product-view.component';
import { EditHomeComponent } from './admin/appearance/edit-home/edit-home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderRequestsComponent } from './admin/customer/order-requests/order-requests.component';
import { OrderDetailsComponent } from './admin/customer/order-details/order-details.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';

//servicess
import { ProductsService } from './products.service';
import { CartService } from './cart.service';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

//guard
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingComponent,
    AdminComponent,
    ProductListComponent,
    ProductAddComponent,
    EditHomeComponent,
    ProductViewComponent,
    ShoppingCartComponent,
    OrderRequestsComponent,
    OrderDetailsComponent,
    ProductEditComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProductsService, CartService,AuthService,AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
