import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Services/Customers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public myService:CustomerService,private router:Router){}
  loginCustomer(Email:any,Password:any)
  {
    let newCustomer = {Email, Password};
    // console.log(newCustomer);
    this.myService.Customerlogin(newCustomer).subscribe(
      {
        next:(data)=>{
          this.router.navigate(['../'])
           console.log(data);
        },
        error:(err)=>{
          console.error("errrrrrrrrrrrrror");
          console.error(err)}
      }
    );

  }

  
}
