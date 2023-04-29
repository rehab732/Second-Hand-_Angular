import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Services/Customers.service';
import { AdminServiceService } from 'src/app/Services/admin-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public customerService:CustomerService, private adminService: AdminServiceService, private router:Router){}

  trylogging=true;

  // loginCustomer(Email:any,Password:any)
  // {
  //   let newCustomer = {Email, Password};
  //   console.log(newCustomer);
  //   this.myService.Customerlogin(newCustomer).subscribe(
  //     {
  //       next:(data:any)=>{
  //         this.router.navigate(['../'])
  //         console.log(data);

  //         localStorage.setItem("UserToken", data.data.token);
  //       },
  //       error:(err)=>{
  //         console.error("errrrrrrrrrrrrror");
  //         console.error(err)}
  //     }
  //   );
  // }

  login(Email:any,Password:any)
  {
    let newUser = {Email, Password};
    // console.log(newCustomer);
    this.adminService.Adminlogin(newUser).subscribe(
      {
        next:(data:any)=>{
          this.router.navigate(['../'])
          console.log(data);

          localStorage.setItem("UserToken", data.data.token);
        },
        error:(err)=>{
          //console.error(err)}
          this.customerService.Customerlogin(newUser).subscribe(
            {
              next:(data:any)=>{
                this.router.navigate(['../'])
                console.log(data);

                localStorage.setItem("UserToken", data.data.token);
              },
              error:(err)=>{
                this.trylogging = false;
                console.error("errrrrrrrrrrrrror");
                console.error(err)
              }
            }
          );
        }
      }
    );

  }
}
