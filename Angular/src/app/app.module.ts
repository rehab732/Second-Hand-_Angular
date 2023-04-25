import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponentComponent } from './components/admin/admin-component/admin-component.component';
import { ProductDetailsComponent } from './components/Seller/product-details/product-details.component';
import { StoreComponent } from './components/Seller/store/store.component';
import { CharityComponent } from './components/charity/charity.component';
import { UpdateCharityComponent } from './components/charity/update-charity/update-charity.component';
import { AddCharityComponent } from './components/charity/add-charity/add-charity.component';
import { CharityDetailsComponent } from './components/charity/charity-details/charity-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponentComponent,

    ProductDetailsComponent,
    StoreComponent,
    CharityComponent,
    UpdateCharityComponent,
    AddCharityComponent,
    CharityDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
