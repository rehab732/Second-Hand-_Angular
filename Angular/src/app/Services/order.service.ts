import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly myClient: HttpClient) { }

  private readonly URL = 'http://localhost:7010/api/Orders';

  AddOrder(order: any) {
    return this.myClient.post(this.URL + '/add', order, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
}
