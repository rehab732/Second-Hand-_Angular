import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/Product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  Id:any;
  Product: any;

  constructor(activeRoute: ActivatedRoute, private prdService:ProductService) {
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

}
