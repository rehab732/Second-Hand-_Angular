import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly myClient:HttpClient) { }

 private readonly URL="http://localhost:3000/products";
  getAllProducts()
  {
    return this.myClient.get(this.URL);
  }

  getProductById(id:any)
  {
    return this.myClient.get(this.URL+'/'+id);

  }


}
