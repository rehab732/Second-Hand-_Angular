import { CategoryServiceService } from 'src/app/Services/category-service.service';
import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/Services/seller.service';
import { CharityService } from 'src/app/Services/charity.service';
import { CustomerService } from 'src/app/Services/Customers.service';
import jwt from 'jwt-decode';


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
  userCanAdd:boolean=true;
  productCharity="";
  categories :any;
  charities :any;
  isDonated = false;
  userId:any;
  userToken: string | null = null;
  AddSuccess=false;

  images=new Array<string>();
  imageIndx=0;

  constructor(private sellerService: SellerService,private customerService:CustomerService, private categoryService:CategoryServiceService,
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
          console.error(err)}
      }
    );

  }

  ngOnInit(): void {
    this.GetSeller();
    this.GetAllCategories();
    this.GetAllCharities();
    //this.images[this.imageIndx] = "cat.jpg";
  }
  GetSeller(){
    this.userToken = localStorage.getItem("UserToken");
    if(this.userToken){
      this.userId = (jwt(this.userToken) as any).customerId;
      this.customerService.getCustumerById(this.userId).subscribe(
        {
          next:(data:any)=>{
            //console.log(data);
            this.userCanAdd=data["data"].CanSellStatus;
            console.log("User can sell: ", this.userCanAdd);


          },

          error:(data:any)=>{ console.log(data);}
        })

    }
  }

  onFileSelected(file:any)
  {
    if(this.imageIndx< 6)
    {
      this.images.push(file.target.files[0].name); //= file.target.files[0].name;
      // if(this.images[this.imageIndx] == null)this.images[this.imageIndx]=""
      this.imageIndx++;
    }
  }

  // RemoveImage(i:any)
  // {
  //   this.images[i] ="";
  // }

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
       "Images": this.images,
       "Color": this.productColor,
       "Category":this.productCategory,
       "Donate":this.isDonated,
       "Charity":this.productCharity,
       "Seller":{"SellerID":this.userId}
  }
    //console.log(product);
    //this.sellerService.AddProduct(product).subscribe(data => console.log('success', data), error => console.log('error', error));
    // console.log("Product Added");

    this.sellerService.AddProduct(product).subscribe(
      {
        next:(data)=>{
         // console.log('success', data);
         this.AddSuccess=true;
        },
        error:(err)=>{
          console.error(err);
          this.AddSuccess=false;}

      }
    );
  }

}
