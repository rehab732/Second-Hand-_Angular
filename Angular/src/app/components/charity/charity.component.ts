import { Component, OnInit } from '@angular/core';
import { CharityService } from 'src/app/Services/charity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charity',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.css']
})
export class CharityComponent implements OnInit {

  Charities: any;

  constructor(private charityService:CharityService, private router:Router) { }

  ngOnInit(): void {
    this.charityService.GetAllCharities().subscribe(
      {
        next:(data:any)=>{
          this.Charities = data.data;
          console.log(this.Charities);
        },
        error:(err)=>{
          console.error(err)}
      })
  }

  updateCharity(charity:any){
    this.router.navigateByUrl("charity-update/"+charity._id);
  }
  add(){
    this.router.navigateByUrl("charity-add");
  }
  deleteCharity(charity:any, btn:any){
    // console.log(btn.parentElement)
    if(confirm("Are you sure you want to delete this product?")){
      this.charityService.deleteCharity(charity._id).subscribe(
        {
          next:(data:any)=>{
            console.log(data);
            window.location.reload();
            // this.router.navigateByUrl("charity");
          },
          error:(err)=>{
            console.error(err)}
        })
      console.log("deleted")
    }
  }
  details(charity:any){
    this.router.navigateByUrl("charity-details/"+charity._id);
  }

}
