import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AdminComponent } from './admin/admin.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { ProductAddComponent } from './admin/product/product-add/product-add.component';
import { EditHomeComponent } from './admin/appearance/edit-home/edit-home.component';
import { ProductViewComponent } from './admin/product/product-view/product-view.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


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
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'productList', pathMatch: 'full'},
      { path: 'productList', component: ProductListComponent},
      { path: 'productAdd', component: ProductAddComponent},
      { path: 'editHome', component: EditHomeComponent},
      { path: 'productView', component: ProductViewComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
