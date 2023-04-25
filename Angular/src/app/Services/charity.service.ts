import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharityService {
  URL = "http://localhost:7010/api/Charities";
  constructor(private httpclient: HttpClient) { }
  GetAllCharities() {
    return this.httpclient.get<any> (this.URL);
  }
}
