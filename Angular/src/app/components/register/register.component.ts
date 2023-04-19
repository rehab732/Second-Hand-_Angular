import { Component, OnInit } from '@angular/core';
import { CustomerService } from './Services/Customers.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private myService:CustomerService){}
  
  Add(Name:any, Email:any, Phone:any,Password:any,DateOfBirth:any){
    
    let newCustomer = {Name, Email, Phone,Password,DateOfBirth};
    console.log(newCustomer);
    this.myService.AddNewCustomer(newCustomer).subscribe(
      {
        next:(data)=>{
          // this.route.navigate(['../'])
          // console.log(data);
        },
        error:(err)=>{console.error(err)}
      }
    );
  }

 
}
