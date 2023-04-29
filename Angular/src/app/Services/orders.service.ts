import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private readonly myClient: HttpClient) {}

  private readonly URL = 'http://localhost:7010/api/Orders'; //API

  GetBuyerOrders(id:any) {
    console.log("Service : Buyer Orders");

    return this.myClient.get(this.URL + '/get/buyer/'+id);
  }

}
