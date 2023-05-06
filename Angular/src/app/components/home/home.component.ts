import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { CustomerService } from 'src/app/Services/Customers.service';
import jwt from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private catservice:CategoryService,private myService:ProductsService,private CustService:CustomerService,private router:Router) {}
  products:any=[];
  Categories:any=[];
  CurrProducts:any=[];
  CurrPrice:Number=0;
  //CustomerID:string="643f45fcbe67bc74a0ec1b44";
  userToken: string | null = null;
  userId:any;
  buttonValue:string="Buy Now";

  SearchProducts(searchWord:string){

      let words=searchWord.split(" ");
      let wordsLower=words.map(word=>{
        return word.toLowerCase();
      })
      console.log(wordsLower);

      this.CurrProducts=this.products.filter((item:any) => {

        let lowercaseName = item.Name.toLowerCase();
        let lowercaseColor = item.Color.toLowerCase();
        let lowercaseCategory = item.Category.toLowerCase();
        let lowercaseDescription = item.Description.toLowerCase();
        //console.log(lowercaseName," ",lowercaseColor," ",lowercaseCategory," ",lowercaseDescription);

        return (
          wordsLower.some(word=>lowercaseName.includes(word)) ||
          wordsLower.some(word=>lowercaseColor.includes(word))  ||
          wordsLower.some(word=>lowercaseCategory.includes(word)) ||
          wordsLower.some(word=>lowercaseDescription.includes(word))
        );
      });


  }

  // FilterProp=(array:any,propName:string,value:any)=>
  //        array.filter((element:any)=>element[propName]===value);

  ClickDetails(Product:any){
    this.router.navigate(['Seller/ProductDetails/'+Product._id]);
  }
  ClickCat(catname:any)
  {
    console.log(catname);
    this.CurrProducts=this.products.filter((pro:any) =>
    pro.Category==catname

    );

  }
  SliderMoved(event:any){
    //console.log(event.target.value);
    this.CurrPrice=event.target.value;
    this.CurrProducts=this.products.filter((pro:any) =>
    pro.Price>=event.target.value
    );
  }
  ClickAll()
  {
    this.CurrProducts=this.products
  }

  AddItemToCart(id:any){
    var item={product:id, quantity:1};
    this.CustService.AddItemToCart(this.userId,item).subscribe({
      next:(data:any)=>{
        console.log(data);
        // let wait=3000;
        // this.buttonValue="Item Added !"
        // setTimeout(() => {
        //   this.buttonValue="Buy Now"
        // }, wait);
      },
      error:(err)=>{
        console.error(err);
        // this.buttonValue="Item already in cart !"

        // let wait=3000;
        // setTimeout(() => {
        //   this.buttonValue="Buy Now"
        // }, wait);
      }
    })
  }
  ngOnInit(): void {

    this.userToken = localStorage.getItem("UserToken");
    if(this.userToken){

      this.userId = (jwt(this.userToken) as any).customerId;

    }
    this.catservice.GetAllCategories().subscribe(
      {
        next:(data:any)=>{
          this.Categories=data["data"];
           console.log(this.Categories);

        },
        error:(err)=>{
          console.error(err)}
      }
    );

    this.myService.GetAllProducts().subscribe(
      {
        next:(data:any)=>{
          console.log(data);

          this.products=data['data'];
          this.products=this.products.filter((pro:any) =>
          pro.Seller.SellerID!=this.userId && pro.Status=="Approved");
          this.CurrProducts=this.products;

          console.log(this.products)
        },
        error:(data)=>{ console.log(data);}
      }
    )

  }

}
