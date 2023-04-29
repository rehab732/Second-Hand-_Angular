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
import { SellerEditProductComponent } from './components/Seller/seller-edit-product/seller-edit-product.component';
import { MakeOrderComponent } from './components/Order/make-order/make-order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { EditprofileComponent } from './components/Seller/editprofile/editprofile.component';
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';
import { UsersListComponentComponent } from './components/admin/users-list-component/users-list-component.component';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';



const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"products",component:HomeComponent},
  {path:"signup",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"Seller/AddProduct",component:SellerAddProductComponent},
  {path:"Seller/EditProduct/:id",component:SellerEditProductComponent},
  {path:"ProductDetails/:id", component:ProductDetailsComponent},
  {path:"store",component:StoreComponent},
  {path:"admin/pending", component:AdminComponentComponent},
  {path:"Seller/ProductDetails/:id", component:ProductDetailsComponent},
  {path:"store/:id",component:StoreComponent},
  {path:"Seller/store/:id",component:StoreComponent},
  {path:"admin/pending", component:AdminComponentComponent},
  {path:"admindashboard",component:AdmindashboardComponent},
  {path:"admin/users", component:UsersListComponentComponent},
  {path:"admin/users/:id", component:UserDetailsComponent},
  {path:"charity" , component:CharityComponent},
  {path:"charity-update/:id" , component:UpdateCharityComponent},
  {path:"charity-add" , component:AddCharityComponent},
  {path:"charity-details/:id" , component:CharityDetailsComponent},
  {path:"editprofile",component:EditprofileComponent},
  {path:"cart",component:CartComponent},
  {path:"payment", component: PaymentComponent}

  {path:"cart/order",component:MakeOrderComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
