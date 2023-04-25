import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private catservice:CategoryService,private myService:ProductsService,private router:Router) {}
  products:any=[];
  Categories:any=[];
  CurrProducts:any=[];
  SellerID:string="643f45fcbe67bc74a0ec1b44";

  ClickCat(catname:any)
  {
    console.log(catname);
    this.CurrProducts=this.products.filter((pro:any) =>
    pro.Category==catname
  );

  }
  ClickAll()
  {
    this.CurrProducts=this.products
  }


  ngOnInit(): void {

    this.catservice.GetAllCategories().subscribe(
      {
        next:(data:any)=>{
          this.Categories=data["data"];
           console.log(this.Categories);

        },
        error:(err)=>{
          console.error(err)}
      }
    );

    this.myService.GetAllProducts().subscribe(
      {
        next:(data:any)=>{
          console.log(data);

          this.products=data['data'];
          this.products=this.products.filter((pro:any) =>
          pro.Seller.SellerID!=this.SellerID);
          this.CurrProducts=this.products;

          console.log(this.products)
        },
        error:(data)=>{ console.log(data);}
      }
    )

  }

}
