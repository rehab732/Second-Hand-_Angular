import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders.service'
import jwt from 'jwt-decode';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recieved-orders-tracking',
  templateUrl: './recieved-orders-tracking.component.html',
  styleUrls: ['./recieved-orders-tracking.component.css']
})
export class RecievedOrdersTrackingComponent implements OnInit {
  Orders: any;
  Id:any;
  userToken: string | null = null;
  userId:any;
  constructor(private ordersService:OrdersService,private router:Router) { }

  ngOnInit(): void {
    this.userToken = localStorage.getItem("UserToken");
    if(this.userToken){

      this.userId = (jwt(this.userToken) as any).customerId;

      this.ordersService.GetSellerOrders(this.userId).subscribe({
        next:(data:any)=>{

          this.Orders=data["data"].sort((b:any, a:any) => new Date(a.RegistrationDate).valueOf() - new Date(b.RegistrationDate).valueOf()) ;
          //console.log(this.Orders);


        },
        error:(err:any)=>{
          console.log(err);
        }
      })


    }
  }
  formatDate(dateStr : any){
    var date = new Date(dateStr)
    //console.log(date);
    return date.toLocaleString();
  }

}
