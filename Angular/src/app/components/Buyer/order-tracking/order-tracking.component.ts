import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders.service';
// import { ProductService } from 'src/app/Services/Product.service';
import { ActivatedRoute,Router } from '@angular/router';
import  jwt_decode from "jwt-decode"

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {

  Orders: any;
  Id:any;
  // userToken:any;
  constructor(private ordersService:OrdersService
    , private router:Router
    , activeRoute: ActivatedRoute)
    // , private productService:ProductService)
    {}

  ngOnInit(): void {
    const EncodedUserToken = localStorage.getItem("UserToken")||"";
    console.log(EncodedUserToken)
    var userToken = this.getDecodedAccessToken(EncodedUserToken); // decode token
    this.Id = userToken.customerId; // get id from token
    console.log(this.Id)

    this.ordersService.GetBuyerOrders(this.Id).subscribe(
      {
        next:(data:any)=>{
          this.Orders = data.data;
          console.log(this.Orders);
        },
        error:(err)=>{
          console.error(err)}
      })
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  //TODO: handle date
  formatDate(dateStr : any){
    console.log("dateStr" , dateStr)
    var date = new Date(dateStr.substr(0,10))
    console.log(date);
    return date.toLocaleDateString("en-US");
  }
  getOrderTotalPrice(Order:any){

    const sum = Order.orderItems.reduce(function(acc:number, Item:any){
      console.log("item: " , parseInt(Item))
       return acc + (parseInt(Item.product.Price) * parseInt(Item.quantity))
      }, 0)

    //product.Price
    return sum;
  }
  //item id , quantity,price
}
