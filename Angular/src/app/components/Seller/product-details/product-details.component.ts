import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/Product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  Id:any;
  Product: any;
  // @Input() DataFromParent:any;

  constructor(activeRoute: ActivatedRoute, private prdService:ProductService, private router : Router) {
    this.Id = activeRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.prdService.GetProductsDetails(this.Id).subscribe(
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
      this.prdService.DeleteProduct(this.Id).subscribe({
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
