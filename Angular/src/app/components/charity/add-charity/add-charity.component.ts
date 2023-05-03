import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CharityService } from 'src/app/Services/charity.service';

@Component({
  selector: 'app-add-charity',
  templateUrl: './add-charity.component.html',
  styleUrls: ['./add-charity.component.css']
})
export class AddCharityComponent implements OnInit {

  constructor(private charityService:CharityService, private router : Router) {}

  IsAdmin:any ;
  token:any;

  ngOnInit(): void {
    this.token = localStorage.getItem("UserToken");
    const tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    this.IsAdmin = tokenInfo.isAdmin; // get isAdmin from token payload
  }
  add(name:any , website:any , description:any){
    this.charityService.AddCharity({name,description,website}).subscribe(
      {
        next:(data:any)=>{
          console.log(data);
          this.router.navigateByUrl("admindashboard");
        },
        error:(err)=>{
          console.error(err)}
      })
    console.log("added")
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
