import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//HttpClient [Get-Post-Delete-Put-Patch]
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private readonly myClient: HttpClient, private router: Router) {}

  private readonly URL = 'http://localhost:7010/api/Customers'; //API

  token:any;

  IsloggedIn(): boolean {
    this.token = localStorage.getItem("UserToken");
    if(this.token)  return true;

    return false;
  }

  AddNewCustomer(customer: any) {
    console.log(customer);
    return this.myClient.post(this.URL + '/reg', customer);
  }
  AddnewAddress(customer: any,customer_id:any) {
    console.log(customer);
    return this.myClient.post(this.URL + '/AddAddress/'+customer_id, customer, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  Customerlogin(customer: any) {
    console.log(customer);
    return this.myClient.post(this.URL + '/login', customer);
  }
  AddItemToCart(customer_id: any,cartItem:any){
    console.log(customer_id,cartItem);
    return this.myClient.post(this.URL + '/AddItemToCart/'+ customer_id,cartItem, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  RemoveItemFromCart(customer_id: any,cartItemId:any){
    console.log(customer_id);
    var obj={product:cartItemId}
    return this.myClient.post(this.URL + '/RemoveItemFromCart/'+ customer_id,obj, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  ClearCart(customer_id:any){
    console.log(customer_id);
    return  this.myClient.post(this.URL + '/ClearCart/'+ customer_id, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  GetCartItems(customer_id: any){
    console.log(customer_id);
    return this.myClient.get(this.URL + '/GetCartItems/'+ customer_id, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  UpdateItemQuantityInCart(customer_id: any,cartItem:any){
    console.log(cartItem);
    return this.myClient.post(this.URL + '/UpdateItemQuantity/'+ customer_id,cartItem , {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }

  GetCustomerDetails(customer_id: any){
    console.log(localStorage.getItem("UserToken"));
    return this.myClient.get(this.URL + '/GetCustomerByID/'+ customer_id, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }


  getAllUsers(){
    return this.myClient.get(this.URL, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  updateCustomer(customer:any,customer_id:any){
    return this.myClient.post(this.URL + "/UpdateCustomer/" + customer_id , customer, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  getCustumerById(_id:any){
    return this.myClient.get(this.URL + "/GetCustomerByID/" + _id, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
}

//   getUserByID(id:any){
//     return this.myClient.get(this.URL+'/'+id);
//   }
//   AddNewUser(user:any){
//     return this.myClient.post(this.URL, user);
//   }

//   UpdateUserByID(id:any,user:any){
//     return this.myClient.put(this.URL+"/"+id, user);
//   }

//   DeleteUserByID(id:any){
//     return this.myClient.delete(this.URL+"/"+id);
//   }
// }

/**
 * Service Root
 * UsersService
 * StudentsService
 * InstService
 * CoursesService
 */

//fetch(url,{method:'post', body:[{},{}]})
