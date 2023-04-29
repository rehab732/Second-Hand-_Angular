import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private readonly myClient: HttpClient) {}

  private readonly URL = 'http://localhost:7010/api/Admins'; //API
  private readonly prdURL = 'http://localhost:7010/api/Products'; //API

  Adminlogin(admin: any) {
    console.log(admin);
    return this.myClient.post(this.URL + '/login', admin);
  }

  GetProducts() {
    console.log("all Products --> admin service");
    //TODO: in Node --> get all pending products
    return this.myClient.get(this.prdURL+"/pending");
  }
  UpdateProduct(product:any){
    try{
      console.log(`${this.prdURL}/${product._id}`);
      console.log(2);
      return this.myClient.post(this.prdURL+"/"+product._id, product);
    }catch(error:any){
      console.log(error.message);
      return error;
    }
  }
}
