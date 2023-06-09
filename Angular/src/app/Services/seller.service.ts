import { Injectable } from '@angular/core';
import {URLs} from './ServiceUrl'
import { HttpClient} from '@angular/common/http';
//import { usermodel } from './usermodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

 URL = URLs+"/Products";
  constructor(private httpclient: HttpClient) { }
  AddProduct(product: any) {
    return this.httpclient.post < any > (this.URL, product, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}})
  }
  UpdateProduct(product: any ,id:any)
  {
    return this.httpclient.put < any > (this.URL+'/'+id, product, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}})
  }

}
