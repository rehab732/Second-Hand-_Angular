import { Component,EventEmitter, OnInit,Output,Input } from '@angular/core';
import { CategoryService } from '../../../Services/category.service';
import { ProductService } from '../../../Services/Product.service';
import { CustomerService } from '../../../Services/Customers.service';
import { Router,ActivatedRoute,RouterModule } from '@angular/router';

import jwt from 'jwt-decode';



@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  Categories:[]=[];
  Products:any=[];
  CurrProducts:any=[];
  userId:any;
  userToken: string | null = null;
  sellerName="your";
  Sellerid:any;
  SellerObj:any;
  // @Output("ProdDetails") myEvent = new EventEmitter();
  //@Input('master') masterName = '';


  constructor(private CustService:CustomerService ,public catService:CategoryService,public proService:ProductService,private router:Router,private route: ActivatedRoute){
  }

  ProductClick(Product:any){
    // this.myEvent.emit(Product);
    this.router.navigateByUrl('ProductDetails/'+Product._id);

  }

  //#region Filters
  FilterAllProducts(){
    this.CurrProducts=this.Products;
  }
  FilterSold(){
    this.CurrProducts=this.Products.filter((pro:any) =>
        pro.AvailableQuantity==0 && pro.Status=="Approved"

      );
  }
  FilterInStock(){
    this.CurrProducts=this.Products.filter((pro:any) =>
        pro.AvailableQuantity>0 && pro.Status=="Approved"

      );
  }

  FilterPending(){
    this.CurrProducts=this.Products.filter((pro:any) =>
   pro.Status==("PendingAddApproval"||"PendingEditApproval")

  );
 }
 //#endregion


 ngOnInit(): void {
    //get current user id
    this.userToken = localStorage.getItem("UserToken");
    if(this.userToken){

      this.userId = (jwt(this.userToken) as any).customerId;
    }
    //get seller id
    this.route.queryParams.subscribe(params => {
      let data=this.route.snapshot.paramMap.get('id');
      if(data != null){
        this.Sellerid=data;

      }
      else{
       //console.log("Cant find seller :",data);
      }

      console.log("Seller",this.Sellerid,"User",this.userId);

    });

    this.CustService.getCustumerById(this.Sellerid).subscribe(
      {
        next:(data:any)=>{
          //console.log("Seller ",data["data.Name"])
          if(this.userId!=this.Sellerid)
             this.sellerName=data.data.Name;
          this.SellerObj=data["data"];
        },
        error:(data)=>{ console.log(data);}
      }
    )


    this.proService.GetSellerProducts(this.Sellerid).subscribe(
      {
        next:(data:any)=>{

          this.Products=data['data'];

          if(this.Sellerid !=this.userId){
            this.Products= this.Products.filter((pro:any) =>
            pro.Status=="Approved"

          );}
          this.CurrProducts=this.Products;
          //console.log(this.Products);
        },
        error:(data)=>{ console.log(data);}
      }
    );
  }

}
