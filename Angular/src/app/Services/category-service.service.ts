import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {URLs} from './ServiceUrl'

@Injectable({
  providedIn: 'root'
})

export class CategoryServiceService {
  URL = URLs+"/Catigories";
  constructor(private httpclient: HttpClient) { }
  GetAllCategories() {
    return this.httpclient.get<any> (this.URL);
  }
}
