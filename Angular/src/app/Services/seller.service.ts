import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
//import { usermodel } from './usermodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

 URL = "http://localhost:7010/api/Products";
  constructor(private httpclient: HttpClient) { }
  AddProduct(product: any) {
    return this.httpclient.post < any > (this.URL, product)
  }
  UpdateProduct(product: any ,id:any)
  {
    return this.httpclient.put < any > (this.URL+'/'+id, product)
  }

}
