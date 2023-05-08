import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders.service';
import { CustomerService } from 'src/app/Services/Customers.service';
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
    , activeRoute: ActivatedRoute
    , private customerService:CustomerService)
    // , private productService:ProductService)
    {}

  ngOnInit(): void {
    const EncodedUserToken = localStorage.getItem("UserToken")||"";
    //console.log(EncodedUserToken)
    var userToken = this.getDecodedAccessToken(EncodedUserToken); // decode token
    this.Id = userToken.customerId; // get id from token

    this.ordersService.GetBuyerOrders(this.Id).subscribe(
      {
        next:(data:any)=>{
          this.Orders = data.data;
          //console.log("orders",this.Orders);
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
  formatDate(dateStr : any){
    var date = new Date(dateStr.substr(0,10))
    //console.log(date);
    return date.toLocaleDateString("en-US");
  }
  getOrderTotalPrice(Order:any){

    const sum = Order.orderItems.reduce(function(acc:number, Item:any){
       return acc + (parseInt(Item.product.Price) * parseInt(Item.quantity))
      }, 0)

    //product.Price
    return sum;
  }
  rate(item:any, index:any , newRating:any,order:any,button:any){
    newRating = Number(newRating)
    var SellerID = item.product.Seller.SellerID;
    //console.log("index" , index)
    var _seller;
    this.customerService.getCustumerById(SellerID).subscribe(
      {
        next:(data:any)=>{
          _seller = data.data;
          //Done: update seller rating
          [_seller.Rating , _seller.NumOfRatings]
          = this.calculateRating(item , _seller.NumOfRatings , _seller.Rating , newRating)

          //console.log("newRating" , item.userRating)
          //console.log("orderItems" , order.orderItems[index]["userRating"])
          order.orderItems[index]["userRating"] = newRating
          //Done:makeUpdateOrderBody
          var orderDB = this.makeOrderBodyForBackend(order)
          this.ordersService.UpdateOrderRatings(orderDB).subscribe({
            next:(data:any)=>{
              //console.log("order update" ,data)
              button.target.value="Thanks For Voting";
              setTimeout(()=>{
                button.target.value="Rate This Product";
              },3000)
            },
            error:(err)=>{
              console.error("OrderTracking.TS" , err)
            }
          })
          //Done:Update customer
          this.updateCustomer(_seller , _seller._id)
        },
        error:(err)=>{
          //console.error(err)
        }
      })

    // console.log(_seller)
  }
  calculateRating(item:any,NumOfRatings:number , SellerRating:number , newRating:number){
    //Done: check if it is already rated
    if(item.userRating != 0)
    {
      alert("already Rated")
      return [SellerRating , NumOfRatings]
    }
    var Rating = (SellerRating * (NumOfRatings/(NumOfRatings + 1)))
    + (newRating * (1/(NumOfRatings + 1)));

    alert("Rating saved successfully")

    return [Rating , NumOfRatings+1];
  }
  updateCustomer(_seller:any , _id:any){
    console.log("updateCustomer --> _seller" , _seller);
    this.customerService.updateCustomer(_seller , _id).subscribe({
      next:()=>{
      },
      error:(err:any)=>{
        //console.log("update error" , err)
      }
    })
  }
  makeOrderBodyForBackend(order:any){//Done:Test This!
    var orderItems=[];
    for(var i=0; i<order.orderItems.length ; i++){
      orderItems.push({
        "product":order.orderItems[i].product._id,
        "quantity":order.orderItems[i].quantity,
        "userRating":Number(order.orderItems[i].userRating),
        // "_id":Number(order.orderItems[i]._id),//FIXME:null _id even wz this line
      })
      //console.log({"_id":Number(order.orderItems[i]._id) , item:orderItems[i]})
    }
    //console.log("makeOrderBodyForBackend --> orderItems" , orderItems)
    return{
      "_id":order._id,
      "orderItems":orderItems,
      "TotalPrice":order.TotalPrice,
      "buyer":order.buyer,
      "Status":order.Status,
      "Address":order.Address,
      "PaymentMethod":order.PaymentMethod,
      "RegistrationDate":order.RegistrationDate,
      "ArrivalDate":order.ArrivalDate,
      "ShippingDate":order.ShippingDate,
    }
  }
  //item id , quantity,price
}
