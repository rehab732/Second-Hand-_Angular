import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Services/category.service';
import { ProductService } from '../../../Services/Product.service';
import { Router, RouterLink,RouterModule } from '@angular/router';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  Categories:[]=[];
  Products:any=[];
  CurrProducts:any=[];
  constructor(public catService:CategoryService,public proService:ProductService,private router:Router){
  }

  ProductClick(Product:any){
    this.router.navigateByUrl('ProductDetails/'+Product._id);

  }
  FilterAll(){
    this.CurrProducts=this.Products;
  }
  FilterSold(){
    this.CurrProducts=this.Products.filter((pro:any) =>
        pro.AvailableQuantity==0

      );
  }
  FilterInStock(){
    this.CurrProducts=this.Products.filter((pro:any) =>
        pro.SoldQuantity==0

      );
  }

  ngOnInit(): void {
    this.catService.GetAllCategories().subscribe(
      {
        next:(data:any)=>{
          this.Categories=data["data"];
           console.log(this.Categories);

        },
        error:(err)=>{
          console.error(err)}
      }
    );

    this.proService.GetSellerProducts("643f45fcbe67bc74a0ec1b44").subscribe(
      {
        next:(data:any)=>{
          this.Products=data['data'];
          this.CurrProducts=data['data'];
          console.log(this.Products);
        },
        error:(data)=>{ console.log(data);}
      }
    );
  }

}
