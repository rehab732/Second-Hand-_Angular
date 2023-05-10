import { ProductService } from 'src/app/Services/Product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/Services/category-service.service';
import { CharityService } from 'src/app/Services/charity.service';
import { SellerService } from 'src/app/Services/seller.service';
import jwt from 'jwt-decode';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrls: ['./seller-edit-product.component.css']
})
export class SellerEditProductComponent implements OnInit {

  productName="";
  productPrice="";
  productCategory="";
  productDescription="";
  productQuantity="";
  productColor="";
  productCharity="";
  categories :any;
  charities :any;
  isDonated = false;
  userToken: string | null = null;
  userId:any;
  images=new Array<string>(6);
  imageIndx=0;
  productID:any;
  Product:any;
  AddSuccess=false;

  constructor(activeRoute: ActivatedRoute,private sellerService: SellerService ,
    private categoryService:CategoryServiceService, private charityService:CharityService ,
    private productService:ProductService)
   {
    this.productID = activeRoute.snapshot.params["id"];
   }

  ngOnInit(): void {
     //user
     this.userToken = localStorage.getItem("UserToken");
     if(this.userToken){

       this.userId = (jwt(this.userToken) as any).customerId;

     }
    this.GetAllCategories();
    this.GetAllCharities();
    this.LoadProduct();
  }

  GetAllCategories()
  {
    this.categoryService.GetAllCategories().subscribe(
      {
        next:(data)=>{
         // console.log(data.data);
          this.categories = data.data;
        },
        error:(err)=>{
          console.error("error");
          console.error(err)}
      }
    );

  }

  GetAllCharities()
  {
    this.charityService.GetAllCharities().subscribe(
      {
        next:(data)=>{
         // console.log(data.data);
          this.charities = data.data;
        },
        error:(err)=>{
          console.error("error");
          console.error(err)}
      }
    );
  }

  LoadProduct()
  {
    this.productService.GetProductsDetails(this.productID).subscribe(
      {
        next:(data)=>{
          this.Product = data;
       //   console.log(this.Product);
          this.FillControlls();
        },
        error:(err)=>{
          console.error("error");
          console.error(err)}
      }
    );
  }
  // "Name":this.productName,
  // "Description": this.productDescription,
  // "Price":+this.productPrice,
  // "AvailableQuantity":+this.productQuantity,
  // "Images": this.productImage,
  // "Color": this.productColor,
  // "Category":this.productCategory,
  // "Donate":this.isDonated,
  // "Charity":this.productCharity,
  // "Seller":{"SellerID":"643f45fcbe67bc74a0ec1b44"}
  FillControlls()
  {
    this.productName = this.Product.data.Name;
    this.productDescription = this.Product.data.Description;
    this.productPrice = this.Product.data.Price;
    this.productQuantity = this.Product.data.AvailableQuantity;
    //this.Images = this.Product.data.Images[0];
    this.productColor = this.Product.data.Color;
   // this.isDonated = this.Product.data.Donate;

  }

  onFileSelected(file:any)
  {
    if(this.imageIndx< 6)
    {
    this.images[this.imageIndx]=file.target.files[0].name;
    this.imageIndx++;
    }
  }

  onSelectionCategoryChange(value:string){
    this.productCategory=value;
   }

   onSelectionCharityChange(value:string)
   {
    this.productCharity=value;
   }

   OnChecked(event:any)
   {
    this.isDonated=event.target.checked;
   }

   EditProduct()
   {
    let product = {
      "Name":this.productName,
      "Description": this.productDescription,
      "Price":+this.productPrice,
      "AvailableQuantity":+this.productQuantity,
      "Images": this.images,
      "Color": this.productColor,
      "Category":this.productCategory,
      "Donate":this.isDonated,
      "Charity":this.productCharity,
      "Seller":{"SellerID":this.userId}
      }
   //console.log(product);


   this.sellerService.UpdateProduct(product,this.productID).subscribe(
     {
       next:(data)=>{
         //console.log('success', data);
         this.AddSuccess=true;
       },
       error:(err)=>{
         //console.error("error");
         console.error(err)
         this.AddSuccess=false;
        }

     }
   );
 }

}
