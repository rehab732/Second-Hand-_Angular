import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { CustomerService } from 'src/app/Services/Customers.service';
import jwt from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private catservice:CategoryService,private myService:ProductsService,private CustService:CustomerService,private router:Router) {}
  products:any=[];
  Categories:any=[];
  CurrProducts:any=[];
  //CustomerID:string="643f45fcbe67bc74a0ec1b44";
  userToken: string | null = null;
  userId:any;

  ClickDetails(Product:any){
    this.router.navigate(['Seller/ProductDetails/'+Product._id]);
  }
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

  AddItemToCart(id:any){
    var item={product:id, quantity:1};
    this.CustService.AddItemToCart(this.userId,item).subscribe({
      next:(data:any)=>{
        console.log(data);
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }
  ngOnInit(): void {

    this.userToken = localStorage.getItem("UserToken");
    if(this.userToken){

      this.userId = (jwt(this.userToken) as any).customerId;

    }
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
          pro.Seller.SellerID!=this.userId && pro.Status=="Approved");
          this.CurrProducts=this.products;

          console.log(this.products)
        },
        error:(data)=>{ console.log(data);}
      }
    )

  }

}
