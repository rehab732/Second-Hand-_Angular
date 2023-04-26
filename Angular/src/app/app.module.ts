import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SellerAddProductComponent } from './components/Seller/seller-add-product/seller-add-product.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './components/Seller/product-details/product-details.component';
import { AdminComponentComponent } from './components/admin/admin-component/admin-component.component';
import { StoreComponent } from './components/Seller/store/store.component';

import { CharityComponent } from './components/charity/charity.component';
import { UpdateCharityComponent } from './components/charity/update-charity/update-charity.component';
import { AddCharityComponent } from './components/charity/add-charity/add-charity.component';
import { CharityDetailsComponent } from './components/charity/charity-details/charity-details.component';

import { CartComponent } from './components/cart/cart.component';
import { UsersListComponentComponent } from './components/admin/users-list-component/users-list-component.component';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    SellerAddProductComponent,
    AdminComponentComponent,
    ProductDetailsComponent,
    StoreComponent,
    CharityComponent,
    UpdateCharityComponent,
    AddCharityComponent,
    CharityDetailsComponent,
    CartComponent,
    UsersListComponentComponent,
    UserDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
