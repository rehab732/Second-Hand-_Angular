import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/Customers.service';
import { OrderService } from 'src/app/Services/order.service';
import { Router } from '@angular/router';
import jwt from 'jwt-decode';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  CartProducts:any=[];
  ItemsPrice:number=0;
  ShippingPrice:number=40;
  customer:any;
  currentAddress:any;
  SelectedAddress:any;
  userToken: string | null = null;
  userId:any;

  constructor(private customerService:CustomerService,
    private orderService:OrderService,private router:Router) { }

  CalculatePrice(){
    this.ItemsPrice=0;
    for(var item of this.CartProducts){
      this.ItemsPrice+=item.product.Price * item.quantity;
    }
  }

  ClickIncQuantity(item:any){
    if(item.product.AvailableQuantity>item.quantity){
      item.quantity++;
      var obj={product:item.product._id,quantity: item.quantity};
      console.log(obj);
      this.customerService.UpdateItemQuantityInCart(this.userId,obj).subscribe({
        next:(data:any)=>{
          //console.log(data);
          this.CalculatePrice();
        },
        error:(err)=>{
          console.error(err)
        }
      });
    }
  }
  ClickDecQuantity(item:any){
    if(item.quantity>1){
      item.quantity--;
      var obj={product:item.product._id,quantity: item.quantity};
      console.log(obj);
      this.customerService.UpdateItemQuantityInCart(this.userId,obj).subscribe({
        next:(data:any)=>{
          //console.log(data);
          this.CalculatePrice();
        },
        error:(err)=>{
          console.error(err)
        }
      });
    }

  }
  RemoveItemFromCart(id:any){
    console.log(id);
    this.customerService.RemoveItemFromCart(this.userId,id).subscribe(
      {
        next:(data:any)=>{
          //console.log(data);
          this.CartProducts=this.CartProducts.filter((item:any) => item.product._id !== id);
          this.CalculatePrice();

        },
        error:(err)=>{
          console.error(err)
        }
      }
    );

  }


  ngOnInit(): void {
    this.userToken = localStorage.getItem("UserToken");
    if(this.userToken){

      this.userId = (jwt(this.userToken) as any).customerId;

    }
    this.customerService.GetCartItems(this.userId).subscribe(
      {
        next:(data:any)=>{
          this.CartProducts=data["data"].items;
          this.CalculatePrice();
           //console.log(this.CartProducts);

        },
        error:(err)=>{
          console.error(err)}
      }
    );
  }

  GetCustomer()
  {
    this.customerService.GetCustomerDetails(this.userId).subscribe(
      {
        next:(data:any)=>{
         this.customer=data.data;
        console.log(this.customer);
        },
        error:(err)=>{
          console.error(err)}
      }
    );
  }

  checkout = false;
  ////order
  ShowOrderDetails()
  {
    this.router.navigate(['payment']);

  }


  onSelectionAddressChange(value:any)
  {
    this.currentAddress=value;
  }

  OrderNow(payMethod:any)
  {
    if(payMethod=="Stripe"){

    }
    else{
      let order = {

        "orderItems": this.CartProducts,
        "buyer": this.userId,
        "TotalPrice": this.ItemsPrice+this.ShippingPrice,
        "Address":this.SelectedAddress,
        "PaymentMethod":"Cash"
      }
      this.AddNewOrder(order);
    }

  }
  AddNewOrder(order:any)
  {
    this.orderService.AddOrder(order).subscribe(
      {
        next:()=>{
        console.log("Order Created");
        },
        error:(err)=>{
          console.error(err)}
      }
    );
  }


}
