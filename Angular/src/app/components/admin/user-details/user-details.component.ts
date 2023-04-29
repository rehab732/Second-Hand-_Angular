import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/Services/Customers.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  User:any;
  Id:any;
  constructor(private customerService:CustomerService , private activatedRoute:ActivatedRoute) {
    this.Id = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.customerService.getCustumerById(this.Id).subscribe({
      next:(data:any)=>{
        this.User = data.data
        console.log(this.User)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  ban(user:any){
    console.log("Banned!")
    user.CanSellStatus = false;
    this.customerService.updateCustomer(user).subscribe({
      next:(data)=>{
        console.log(data)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  removeBan(user:any){
    console.log("ban removede!")
    user.CanSellStatus = true;
    this.customerService.updateCustomer(user).subscribe({
      next:(data)=>{
        console.log(data)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
