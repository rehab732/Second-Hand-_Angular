import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CharityService } from 'src/app/Services/charity.service';

@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.css']
})
export class CharityDetailsComponent implements OnInit {

  Id:any;
  Charity: any;
  IsAdmin:any ;
  token:any;

  constructor(activeRoute: ActivatedRoute
    , private charityService:CharityService, private router : Router) {
    this.Id = activeRoute.snapshot.params["id"];

    this.token = localStorage.getItem("UserToken");
    const tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    this.IsAdmin = tokenInfo.isAdmin; // get isAdmin from token payload
  }

  ngOnInit(): void {
    this.charityService.GetCharityById(this.Id).subscribe(
      {
        next:(data:any)=>{
          this.Charity = data.data ;
          //console.log(this.Charity);
        },
        error:(err)=>{
          console.error(err)}
      })
  }
  backToList(){
    this.router.navigateByUrl("admindashboard");
  }
  delete(){
    if(confirm("Are you sure you want to delete this product?")){
      this.charityService.deleteCharity(this.Charity._id).subscribe(
        {
          next:(data:any)=>{
            //console.log(data);
            this.router.navigateByUrl("charity");
          },
          error:(err)=>{
            console.error(err)}
        })
      this.router.navigateByUrl("charity");
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
