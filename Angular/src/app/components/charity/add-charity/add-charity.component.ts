import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharityService } from 'src/app/Services/charity.service';

@Component({
  selector: 'app-add-charity',
  templateUrl: './add-charity.component.html',
  styleUrls: ['./add-charity.component.css']
})
export class AddCharityComponent implements OnInit {

  constructor(private charityService:CharityService, private router : Router) {}

  ngOnInit(): void {
  }
  add(name:any , website:any , description:any){
    this.charityService.AddCharity({name,description,website}).subscribe(
      {
        next:(data:any)=>{
          console.log(data);
          this.router.navigateByUrl("charity");
        },
        error:(err)=>{
          console.error(err)}
      })
    console.log("added")
  }
}
