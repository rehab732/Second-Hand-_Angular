import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private myService:ProductsService,private router:Router) {}
  products:any=[];

  ngOnInit(): void {
    this.myService.getAllProducts().subscribe(
      {
        next:(data)=>{
          this.products=data;
          console.log(data);
        },
        error:(data)=>{}
      }
    );



  }



  GetDetails()
  {
   this.router.navigate(["/products/1"]);
  }

}
