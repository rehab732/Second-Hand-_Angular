import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private readonly myClient: HttpClient) {}

  private readonly URL = 'http://localhost:7010/api/Products'; //API

  GetProducts() {
    console.log("all Products --> admin service");
    //TODO: in Node --> get all pending products
    return this.myClient.get(this.URL+"/pending");
  }
  UpdateProduct(product:any){
    try{
      console.log(`${this.URL}/${product._id}`);
      console.log(2);
      return this.myClient.post(this.URL+"/"+product._id, product);
    }catch(error:any){
      console.log(error.message);
      return error;
    }
  }
}
