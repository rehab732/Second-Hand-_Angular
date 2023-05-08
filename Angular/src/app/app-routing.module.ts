import { Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SellerAddProductComponent } from './components/Seller/seller-add-product/seller-add-product.component';
import { ProductDetailsComponent } from './components/Seller/product-details/product-details.component';
import { StoreComponent } from './components/Seller/store/store.component';
import { CartComponent } from './components/cart/cart.component';
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
import { OrderTrackingComponent } from './components/Buyer/order-tracking/order-tracking.component';
import { UpdateCategoryComponent } from './components/admin/category/update-category/update-category.component';
import { AddCategoryComponent } from './components/admin/category/add-category/add-category.component';
import { CustomerService } from './Services/Customers.service';
import {RecievedOrdersTrackingComponent} from  './components/Seller/recieved-orders-tracking/recieved-orders-tracking.component';
import {CharityComponent} from "./components/charity/charity.component"



@Injectable()
class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private customerService: CustomerService, private router: Router) {};

  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (this.customerService.IsloggedIn()) {
      return true;
    } else {
      alert("You don't authenticated to view this page, please Log in");
      this.router.navigateByUrl("login");
      return false;
    }
  }
}

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"products",component:HomeComponent},
  {path:"signup",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"Seller/AddProduct",component:SellerAddProductComponent, canActivate:[OnlyLoggedInUsersGuard]},
  {path:"Seller/EditProduct/:id",component:SellerEditProductComponent, canActivate:[OnlyLoggedInUsersGuard]},
  {path:"Seller/RecievedOrders",component:RecievedOrdersTrackingComponent},
  {path:"ProductDetails/:id", component:ProductDetailsComponent},
  {path:"store",component:StoreComponent, canActivate:[OnlyLoggedInUsersGuard]},
  {path:"Seller/ProductDetails/:id", component:ProductDetailsComponent},
  {path:"store/:id",component:StoreComponent},
  {path:"Seller/store/:id",component:StoreComponent},
  //{path:"admin/pending", component:AdminComponentComponent},
  {path:"admindashboard",component:AdmindashboardComponent, canActivate:[OnlyLoggedInUsersGuard]},
  //{path:"admin/users", component:UsersListComponentComponent},
  {path:"admin/users/:id", component:UserDetailsComponent, canActivate:[OnlyLoggedInUsersGuard]},
  // {path:"charity" , component:CharityComponent},
  {path:"charity-update/:id" , component:UpdateCharityComponent, canActivate:[OnlyLoggedInUsersGuard]},
  {path:"charity-add" , component:AddCharityComponent, canActivate:[OnlyLoggedInUsersGuard]},
  {path:"charity-details/:id" , component:CharityDetailsComponent},
  {path:"editprofile", component:EditprofileComponent, canActivate:[OnlyLoggedInUsersGuard]},
  {
    path:"cart",
    component:CartComponent,
    canActivate: [OnlyLoggedInUsersGuard],
  },
  {path:"buyer/orders",component:OrderTrackingComponent, canActivate:[OnlyLoggedInUsersGuard]},
  {path:"payment", component: PaymentComponent, canActivate:[OnlyLoggedInUsersGuard]},
  {path:"cart/order",component:MakeOrderComponent, canActivate:[OnlyLoggedInUsersGuard]},
  {path:"category-update/:name" , component:UpdateCategoryComponent, canActivate:[OnlyLoggedInUsersGuard]},
  {path:"category-add" , component:AddCategoryComponent, canActivate:[OnlyLoggedInUsersGuard]},
  {path:"**",component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [OnlyLoggedInUsersGuard],
})
export class AppRoutingModule { }
