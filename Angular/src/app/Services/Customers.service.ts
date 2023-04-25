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

  AddNewCustomer(customer: any) {
    console.log(customer);
    return this.myClient.post(this.URL + '/reg', customer);
  }

  Customerlogin(customer: any) {
    console.log(customer);
    return this.myClient.post(this.URL + '/login', customer);
  }
  AddItemToCart(customer_id: any,cartItem:any){
    console.log(customer_id,cartItem);
    return this.myClient.post(this.URL + '/AddItemToCart/'+ customer_id,cartItem);
  }
  RemoveItemFromCart(customer_id: any,cartItemId:any){
    console.log(customer_id);
    var obj={product:cartItemId}
    return this.myClient.post(this.URL + '/RemoveItemFromCart/'+ customer_id,obj);
  }
  GetCartItems(customer_id: any){
    console.log(customer_id);
    return this.myClient.get(this.URL + '/GetCartItems/'+ customer_id);
  }


}

//   getAllUsers(){
//     return this.myClient.get(this.URL);
//   }
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
