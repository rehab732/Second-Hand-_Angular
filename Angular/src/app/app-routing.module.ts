import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { SellerAddProductComponent } from './components/Seller/seller-add-product/seller-add-product.component';

import { ProductDetailsComponent } from './components/Seller/product-details/product-details.component';
import { StoreComponent } from './components/Seller/store/store.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponentComponent } from './components/admin/admin-component/admin-component.component';






const routes: Routes = [

  {path:"",component:HomeComponent},
  {path:"products",component:HomeComponent},
  {path:"signup",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"",component:HomeComponent},

  {path:"Seller/AddProduct",component:SellerAddProductComponent}

  {path:"ProductDetails/:id", component:ProductDetailsComponent},
  {path:"store",component:StoreComponent},
  {path:"cart",component:CartComponent},
  {path:"admin/pending", component:AdminComponentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
