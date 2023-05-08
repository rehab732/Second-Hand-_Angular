import { Component, OnInit } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { OrderService } from 'src/app/Services/order.service';
import { CustomerService } from '../../Services/Customers.service';
import { CharityService } from '../../Services/charity.service';
import { ProductService } from '../../Services/Product.service';
import { Router } from '@angular/router';
import jwt from 'jwt-decode';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {

  CartProducts:any=[];
  FetchedItems:any=[];
  ItemsPrice:number=0;
  ShippingPrice:number=40;
  customer:any;
  currentAddress:any;
  SelectedAddress:any;
  userToken: string | null = null;
  userId:any;
  payVerified:boolean=false;
  checkout = false;
  orderCompleted:boolean=false;
  payToken:any;
  handler: any = null;

  constructor(private customerService:CustomerService,private orderService:OrderService,private router : Router,
    private charityService:CharityService,private productService:ProductService) {}


  ngOnInit(): void {

    //user
    this.userToken = localStorage.getItem("UserToken");
    if(this.userToken){

      this.userId = (jwt(this.userToken) as any).customerId;

    }

    //stripe
    this.loadStripe();
    //cart items
    this.customerService.GetCartItems(this.userId).subscribe(
      {
        next:(data:any)=>{
          this.FetchedItems = data["data"].items
          this.CartProducts=[];
          for(var i=0;i<data["data"].items.length ; i++){
            this.CartProducts.push({
              "product":data["data"].items[i].product._id,
              "quantity":data["data"].items[i].quantity,
              "userRating":data["data"].items[i].userRating,
              "_id":data["data"].items[i]._id,
            })
          }
          this.CalculatePrice();
           console.log(this.CartProducts);

        },
        error:(err)=>{
          console.error(err)}
      }
    );
    this.customerService.getCustumerById(this.userId).subscribe(
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
  CalculatePrice(){
    this.ItemsPrice=0;
    for(var item of this.FetchedItems){
      this.ItemsPrice+=item.product.Price * item.quantity;
    }
  }
  onSelectionAddressChange(value:any)
  {
    this.currentAddress=value;
  }
  OrderNow(payMethod:any)
  {
    if(payMethod=="Stripe"){
       console.log(this.handler);
      if(this.handler!=null){
        let order = {
          //"ShippingDate":"12.10.2020 - 14.10.2020" ,
          "orderItems": this.CartProducts,
          "buyer": this.userId,
          "TotalPrice": this.ItemsPrice+this.ShippingPrice,
          "Address":this.SelectedAddress,
          "PaymentMethod":"Stripe"
        }
        console.log("order in pay comp" , order)
        this.AddNewOrder(order);
      }
      else{
        this.pay(this.ItemsPrice+this.ShippingPrice);
      }
    }
    else{
      let order = {
        //"ShippingDate":"12.10.2020 - 14.10.2020" ,
        "orderItems": this.CartProducts,
        "buyer": this.userId,
        "TotalPrice": this.ItemsPrice+this.ShippingPrice,
        "Address":this.SelectedAddress,
        "PaymentMethod":"Cash"
      }
      this.AddNewOrder(order);
      this.CheckCharity(this.CartProducts);
    }

  }

  AddNewOrder(order:any)
  {
    this.orderService.AddOrder(order).subscribe(
      {
        next:()=>{

        console.log("Order Created");
        this.orderCompleted=true;
        this.router.navigate(['']);
        },
        error:(err)=>{
          console.error(err)}
      }
    );
  }
  CheckCharity(products:any){
    for(var i in products){
        if(products[i].product.Donate){
          var item={product:products[i].product._id,quantity:products[i].quantity}
          console.log(item);
          this.charityService.AddProductToCharity(products[i].product.Charity,item).subscribe({
            next:(data:any)=>{
              console.log(data);
              },
              error:(err)=>{
                console.error(err)}
          });
        }

    }
  }
  pay(amount: any) {
    this.handler = (<any>window).StripeCheckout.configure({
      key: env.stripe.publicKey,
      locale: 'auto',
      currency:"EGP",
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);

        //alert('Token Created!!');
      },

    });


    this.handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100,
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: env.stripe.publicKey, //public key
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);

            alert('Payment Success!!');
          },
        });
      };
    }
  }
}
