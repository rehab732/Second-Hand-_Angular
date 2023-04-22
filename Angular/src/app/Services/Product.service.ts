import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//HttpClient [Get-Post-Delete-Put-Patch]
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly myClient: HttpClient) {}

  private readonly URL = 'http://localhost:7010/api/Products'; //API

  GetProductsDetails(id:any) {
    console.log("Product details services");

    return this.myClient.get(this.URL + '/getById/'+id);
  }

}

