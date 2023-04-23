import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/Seller/product-details/product-details.component';
import { StoreComponent } from './components/store/store.component';



const routes: Routes = [
  {path:"signup",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"",component:HomeComponent},

  {path:"ProductDetails/:id", component:ProductDetailsComponent}
  {path:"store",component:StoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
