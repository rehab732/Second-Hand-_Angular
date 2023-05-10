import { Component, OnInit,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/Product.service';
import { CustomerService } from 'src/app/Services/Customers.service';
import jwt from 'jwt-decode';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  ratingPartial=false;
  rating:any;
  prodImages:any;
  currentImage:string="";
  activeIndex = 0;
  prdId:any;
  Product: any;
  userId:any;
  userToken: string | null = null;
  buttonValue="Add to cart";
  productDate="";
  constructor(private CustService:CustomerService,activeRoute: ActivatedRoute, private prdService:ProductService, private router : Router) {
    this.prdId = activeRoute.snapshot.params["id"];
  }
  EditProduct(productId:any){
    this.router.navigate(['Seller/EditProduct/',productId]);
  }
  changeImage(index: number) {
    this.currentImage = this.prodImages[index];
    this.activeIndex = index;
  }
  ClickSeller(Seller:any){
    //console.log(Seller)
    this.router.navigate(['/store',Seller._id]);

  }
  ngOnInit(): void {



    this.userToken = localStorage.getItem("UserToken");
    if(this.userToken){

      this.userId = (jwt(this.userToken) as any).customerId;
    }
    this.prdService.GetProductsDetails(this.prdId).subscribe(
      {
        next:(data:any)=>{
          this.Product = data["data"] ;
          this.prodImages=this.Product.Images;
          this.currentImage=this.prodImages[0];
          this.productDate= this.Product.ReleaseDate.split("T")[0];
          let SellerRating=this.Product.Seller.SellerID.Rating;
          //console.log(SellerRating);
          //console.log(this.Product.Seller.SellerID._id, this.userId);
          //get heighst value
          let rate=Math.ceil(SellerRating);
          //check if there will be half a star
          //console.log(rate-SellerRating)
          //2.8 =>3
          if(rate-SellerRating<=0.2){
            this.rating=Array(rate).fill(1);
          }
          //(2.2 -> 2,7) =>2  +half star
          else if(rate-SellerRating>=0.2 && rate-SellerRating<=0.8  ){
              this.ratingPartial=true;
              this.rating=Array(Math.floor(SellerRating)).fill(1);
          }
            //(2->2.1) =>2  only
          else{
            this.rating=Array(Math.floor(SellerRating)).fill(1);
          }
          console.log(SellerRating);



        },
        error:(err)=>{
          console.error(err)}
      })
  }
  AddItemToCart(id:any){
    var item={product:id, quantity:1};
    this.CustService.AddItemToCart(this.userId,item).subscribe({
      next:(data:any)=>{
        //console.log(data);
        this.buttonValue="Item Added !"
        let wait=3000;
        setTimeout(() => {
          this.buttonValue="Add to cart"
        }, wait);
      },
      error:(err)=>{
        console.error(err);
        this.buttonValue="Item already in cart !"

        let wait=3000;
        setTimeout(() => {
          this.buttonValue="Add to cart"
        }, wait);
      }
    })
  }
  deleteProduct(){
    if(confirm("Are you sure you want to delete this product?")){
      this.prdService.DeleteProduct(this.prdId).subscribe({
        next:(data)=>{
          console.log(data);
         // this.router.navigate(["../../"]);
        },
        error:(err)=>{
          console.error(err)}
      })
    }
  }


}
