import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URLs} from './ServiceUrl'

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private readonly myClient: HttpClient) {}

  private readonly URL = URLs+'/Admins'; //API
  private readonly prdURL =URLs+ '/Products'; //API

  Adminlogin(admin: any) {
    console.log(admin);
    return this.myClient.post(this.URL + '/login', admin);
  }

  GetProducts() {
    console.log("all Products --> admin service");
    //console.log(localStorage.getItem("UserToken"));
    return this.myClient.get(this.prdURL+"/pending", {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
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
