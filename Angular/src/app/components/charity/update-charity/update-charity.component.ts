import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CharityService } from 'src/app/Services/charity.service';

@Component({
  selector: 'app-update-charity',
  templateUrl: './update-charity.component.html',
  styleUrls: ['./update-charity.component.css']
})
export class UpdateCharityComponent implements OnInit {

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
          console.log(this.Charity);
        },
        error:(err)=>{
          console.error(err)}
      })
  }
  update(name:any , website:any , description:any){
    this.charityService.UpdateCharityByName(this.Charity.name
      , {name,description,website}).subscribe(
      {
        next:(data:any)=>{
          console.log(data);
          console.log("updated");
          this.router.navigateByUrl("admindashboard");
        },
        error:(err)=>{
          console.error(err)}
      })
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
