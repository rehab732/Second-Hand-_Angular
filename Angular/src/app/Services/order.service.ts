import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URLs} from './ServiceUrl'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly myClient: HttpClient) { }

  private readonly URL = URLs+'/Orders';

  AddOrder(order: any) {
    return this.myClient.post(this.URL + '/add', order, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
}
