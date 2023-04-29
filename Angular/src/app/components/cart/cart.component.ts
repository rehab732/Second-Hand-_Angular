import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/Customers.service';
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
  //CustomerId:string="643f45fcbe67bc74a0ec1b44";
  userToken: string | null = null;
  userId:any;
  constructor(private customerService:CustomerService) { }

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
          console.log(data);
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
          console.log(data);
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
          console.log(data);
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
           console.log(this.CartProducts);

        },
        error:(err)=>{
          console.error(err)}
      }
    );
  }

}
