import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CategoryServiceService {
  URL = "http://localhost:7010/api/Catigories";
  constructor(private httpclient: HttpClient) { }
  GetAllCategories() {
    return this.httpclient.get<any> (this.URL);
  }
}
