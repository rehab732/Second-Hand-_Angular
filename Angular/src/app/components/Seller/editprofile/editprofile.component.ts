import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CustomerService } from 'src/app/Services/Customers.service';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  token:any;
  customerID:any;
  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }


  constructor(public customerService:CustomerService, private router:Router){}
 customerdetails:any;
 showDetailsFlag = false;
  details = 'This is the details section.';
  showDetails() {
    this.showDetailsFlag = true;
  }

Add(Apart:any,Floor:any,Street:any,Zone:any,City:any,Gover:any)
{
  let newaddress =  {
            ApartmentNumber:+Apart,
            FloorNumber:+Floor,
            Street: Street,
            Zone:Zone,
            City:City,
            Governorate:Gover
     };
    // console.log(newaddress);
    this.customerService.AddnewAddress(newaddress,this.customerID).subscribe(
      {
        next:(data)=>{
           console.log("customerService.AddnewAddress" , data);
        },
        error:(err)=>{
          console.error("errrrrrrrrrrrrror");
          console.error(err)}
      }
    );
}


Edit(name:any,phone:any,email:any,dofb:any)
{
  let editedCustomer={
    Name:name,
    Phone:phone,
    Email:email,
    DateOfBirth:dofb,
    Password:"dummyJustToKeepStructure"//not updated in DB
  }
this.customerService.editCustomerProfile(editedCustomer,this.customerID).subscribe(
  {
    next:(data)=>{
      console.log(data);
    },
    error:(err)=>{
      console.error("up-error" , err.message);
    }
  }
)

}

  ngOnInit(): void {
    this.token = localStorage.getItem("UserToken");
    const tokenInfo = this.getDecodedAccessToken(this.token);
     this.customerID = tokenInfo.customerId;
   this.customerService.getCustumerById(this.customerID).subscribe(
    {
      next:(data:any)=>{
        this.customerdetails = data["data"];
         console.log(data);
      },
      error:(err)=>{
        console.error("errrrrrrrrrrrrror");
        console.error(err)}
    }
  );




  }

}
