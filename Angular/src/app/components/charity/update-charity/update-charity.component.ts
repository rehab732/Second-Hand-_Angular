import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharityService } from 'src/app/Services/charity.service';

@Component({
  selector: 'app-update-charity',
  templateUrl: './update-charity.component.html',
  styleUrls: ['./update-charity.component.css']
})
export class UpdateCharityComponent implements OnInit {

  Id:any;
  Charity: any;

  constructor(activeRoute: ActivatedRoute
    , private charityService:CharityService, private router : Router) {
    this.Id = activeRoute.snapshot.params["id"];
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
          this.router.navigateByUrl("charity");
        },
        error:(err)=>{
          console.error(err)}
      })
    console.log("updated")
  }
}
