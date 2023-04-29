import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/Product.service';
import jwt from 'jwt-decode';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  prdId:any;
  Product: any;
  // @Input() DataFromParent:any;
  userId:any;
  userToken: string | null = null;

  constructor(activeRoute: ActivatedRoute, private prdService:ProductService, private router : Router) {
    this.prdId = activeRoute.snapshot.params["id"];
  }
  ClickSeller(Seller:any){
    console.log(Seller)
    this.router.navigate(['/store',Seller._id]);

  }
  ngOnInit(): void {
    this.userToken = localStorage.getItem("UserToken");
    if(this.userToken){

      this.userId = (jwt(this.userToken) as any).customerId;
    }
    this.prdService.GetProductsDetails(this.prdId).subscribe(
      {
        next:(data)=>{
          this.Product = data ;
          console.log(this.Product);
        },
        error:(err)=>{
          console.error(err)}
      })
  }

  deleteProduct(){
    if(confirm("Are you sure you want to delete this product?")){
      this.prdService.DeleteProduct(this.prdId).subscribe({
        next:(data)=>{
          console.log(data);
          this.router.navigate(["../../"]);
        },
        error:(err)=>{
          console.error(err)}
      })
    }
  }

}
