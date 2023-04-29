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
import { CharityComponent } from './components/charity/charity.component';
import { UpdateCharityComponent } from './components/charity/update-charity/update-charity.component';
import { AddCharityComponent } from './components/charity/add-charity/add-charity.component';
import { CharityDetailsComponent } from './components/charity/charity-details/charity-details.component';
import { PaymentComponent } from './components/payment/payment.component';



const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"products",component:HomeComponent},
  {path:"signup",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"",component:HomeComponent},
  {path:"Seller/AddProduct",component:SellerAddProductComponent},
  {path:"ProductDetails/:id", component:ProductDetailsComponent},
  {path:"store",component:StoreComponent},
  {path:"admin/pending", component:AdminComponentComponent},
  {path:"charity" , component:CharityComponent},
  {path:"charity-update/:id" , component:UpdateCharityComponent},
  {path:"charity-add" , component:AddCharityComponent},
  {path:"charity-details/:id" , component:CharityDetailsComponent},
  {path:"cart",component:CartComponent},
  {path:"payment", component: PaymentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
