import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly myClient:HttpClient) { }

//  private readonly URL="http://localhost:3000/products";

private readonly URL = 'http://localhost:7010/api/Products'; //API
  // getAllProducts()
  // {
  //   return this.myClient.get(this.URL);
  // }

  GetProductById(id:any)
  {
    return this.myClient.get(this.URL+'/'+id);

  }
  GetAllProducts() {
    return this.myClient.get(this.URL);
  }

}
