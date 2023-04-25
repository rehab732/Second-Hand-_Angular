import { CategoryServiceService } from 'src/app/Services/category-service.service';
import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/Services/seller.service';
import { CharityService } from 'src/app/Services/charity.service';


@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  productName="";
  productPrice="";
  productCategory="";
  productDescription="";
  productQuantity="";
  productColor="";
  productImage="";
  productCharity="";
  categories :any;
  charities :any;
  isDonated = false;


  constructor(private sellerService: SellerService , private categoryService:CategoryServiceService,
    private charityService:CharityService)
   {

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
          console.error("errrrrrrrrrrrrror");
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
          console.error("errrrrrrrrrrrrror");
          console.error(err)}
      }
    );

  }

  ngOnInit(): void {
    this.GetAllCategories();
    this.GetAllCharities();
  }

  onFileSelected(file:any)
  {
    this.productImage= file.target.files[0].name;
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

  AddProduct()
  {
    let product = {
       "Name":this.productName,
       "Description": this.productDescription,
       "Price":+this.productPrice,
       "AvailableQuantity":+this.productQuantity,
       "Images": this.productImage,
       "Color": this.productColor,
       "Category":this.productCategory,
       "Donate":this.isDonated,
       "Charity":this.productCharity,
       "Seller":{"SellerID":"643f45fcbe67bc74a0ec1b44"}
  }
    console.log(product);
    // this.sellerService.AddProduct(product).subscribe(data => console.log('success', data), error => console.log('error', error));
    // console.log("Product Added");

    this.sellerService.AddProduct(product).subscribe(
      {
        next:(data)=>{
          console.log('success', data);
        },
        error:(err)=>{
          console.error("errrrrrrrrrrrrror");
          console.error(err)}
      }
    );
  }

}
