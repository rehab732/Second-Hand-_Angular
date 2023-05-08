import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Services/Customers.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-list-component',
  templateUrl: './users-list-component.component.html',
  styleUrls: ['./users-list-component.component.css']
})
export class UsersListComponentComponent implements OnInit {

  Users:any;
  ID:any;
  UnaithorizedMsg :any ;


  constructor(private cutomerService:CustomerService , private router:Router) { }

  ngOnInit(): void {
    this.cutomerService.getAllUsers().subscribe({
      next:(data:any)=>{
        this.Users = data.data
        console.log(this.Users)
      },
      error:(err:any)=>{
        if(err.status == 401){
          this.UnaithorizedMsg = err.error ;
        }else{
          console.log(err);
        }
      }
    })
  }
  ban(user:any){
    console.log("Banned!")
    user.CanSellStatus = false;
    // console.log("banUser" , user)
    this.cutomerService.updateCustomer(user,user._id).subscribe({
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
    this.cutomerService.updateCustomer(user,this.ID).subscribe({
      next:(data)=>{
        console.log(data)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  getDetails(user:any){
    this.router.navigateByUrl("admin/users/"+user._id);
  }
}
