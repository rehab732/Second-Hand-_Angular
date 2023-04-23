import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id:any;
  product:any;

  constructor(myActivated:ActivatedRoute,private myService:ProductsService) {
    this.id=myActivated.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.myService.getProductById(this.id).subscribe(
      {
        next:(data)=>{
          this.product=data;
          console.log(data);

        },
        error:(data)=>{}
      }
    );
  }

}
