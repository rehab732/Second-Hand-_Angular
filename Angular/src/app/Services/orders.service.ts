import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URLs} from './ServiceUrl'
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private readonly myClient: HttpClient) {}

  private readonly URL =URLs+'/Orders'; //API

  GetBuyerOrders(id:any) {
    console.log("Service : Buyer Orders");

    return this.myClient.get(this.URL + '/get/buyer/'+id, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  UpdateOrderRatings(order:any){
    console.log(order);

    return this.myClient.put(this.URL + '/update/'+order._id , order,{headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  GetSellerOrders(id:any){
      return this.myClient.get(this.URL + '/getSeller/'+id, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
}
