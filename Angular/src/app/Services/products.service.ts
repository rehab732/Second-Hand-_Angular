import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import {URLs} from './ServiceUrl'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly myClient:HttpClient) { }

//  private readonly URL="http://localhost:3000/products";

private readonly URL = URLs+'/Products'; //API
  // getAllProducts()
  // {
  //   return this.myClient.get(this.URL);
  // }

  GetProductById(id:any)
  {
    return this.myClient.get(this.URL+'/'+id);

  }
  GetAllProducts(p:any) {
    if(localStorage.getItem("UserToken"))
      return this.myClient.get(this.URL, {params: {page:p}, headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
    else
      return this.myClient.get(this.URL, {params: {page:p}});
  }

}
