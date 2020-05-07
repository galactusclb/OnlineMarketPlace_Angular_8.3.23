import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AdminComponent } from './admin/admin.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { ProductAddComponent } from './admin/product/product-add/product-add.component';
import { ProductViewComponent } from './admin/product/product-view/product-view.component';
import { ProductEditComponent } from './admin/product/product-edit/product-edit.component';
import { EditHomeComponent } from './admin/appearance/edit-home/edit-home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderRequestsComponent } from './admin/customer/order-requests/order-requests.component';
import { OrderDetailsComponent } from './admin/customer/order-details/order-details.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path : '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'shopping',
    component: ShoppingComponent    
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'productList', pathMatch: 'full'},
      { path: 'productList', component: ProductListComponent},
      { path: 'productAdd', component: ProductAddComponent},
      { path: 'productView', component: ProductViewComponent},
      { path: 'productEdit', component: ProductEditComponent},
      { path: 'orderRequests' , component : OrderRequestsComponent},
      { path: 'orderDetails' , component: OrderDetailsComponent},
      { path: 'editHome', component: EditHomeComponent}
    ],
    canActivate: [AuthGuard],
    canLoad: [AuthGuard] 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
