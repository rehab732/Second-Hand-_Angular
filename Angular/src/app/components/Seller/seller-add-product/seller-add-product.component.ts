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

  productCharity="";
  categories :any;
  charities :any;
  isDonated = false;

  images=new Array<string>(6);
  imageIndx=0;
  validData = true;

  maxLengthWarn = "";
  productAdded = "";


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
    //this.images[this.imageIndx] = "cat.jpg";
  }

  onFileSelected(file:any)
  {
    if(this.imageIndx< 6)
    {
    this.images[this.imageIndx]=file.target.files[0].name; //= file.target.files[0].name;
    this.imageIndx++;
    }
    else
    {
      this.maxLengthWarn = "Max Number of photos Allowed Are 6 only";
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
       "Seller":{"SellerID":"643f45fcbe67bc74a0ec1b44"}
  }
   // console.log(product);
    if(this.productName == "" || this.productColor == "" || this.productDescription ==""||
    this.productQuantity == "" || this.productPrice==""|| this.imageIndx==0)
    {
        this.validData=false;
    }
    else
    {
      this.validData = true;

    this.sellerService.AddProduct(product).subscribe(
      {
        next:(data)=>{
          this.productAdded = "Product Added";

        },
        error:(err)=>{
          console.error("errrrrrrrrrrrrror");
          console.error(err)}
      }
    );
    }
  }

}
