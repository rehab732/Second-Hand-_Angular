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

  GetAllProducts() {
    return this.myClient.get(this.URL);
  }

  DeleteProduct(id:any){

    return this.myClient.delete(this.URL +"/"+ id, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }

  GetSellerProducts(id:any){
    return this.myClient.get(this.URL+'/Seller/'+id, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  UpdateProductQuantity(productQuantity: any ,id:any)
  {
    return this.myClient.put < any > (this.URL+'/quantity/'+id, productQuantity, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}})
  }

}

