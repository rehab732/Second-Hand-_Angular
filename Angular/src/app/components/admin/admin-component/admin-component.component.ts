import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/Services/admin-service.service';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})
export class AdminComponentComponent implements OnInit {

  Products: any;
  UnaithorizedMsg:any;

  constructor(private adminSevice:AdminServiceService, private router:Router) { }

  ngOnInit(): void {

    this.adminSevice.GetProducts().subscribe(
      {
        next:(data:any)=>{
          this.Products = data.data;
          //console.log(this.Products);
          if(!this.Products){
            this.UnaithorizedMsg="There is no pending products";
          }

        },
        error:(err)=>{
          if(err.status == 401){
            this.UnaithorizedMsg = err.error ;
          }else{
            console.error(err);
          }
        }
      })

  }
  approveProduct(product:any ){
    product.Status = "Approved"
    //console.log("admin compoent" , product)
    //var btns = document.getElementsByClassName("btn");
    // btns[0].disabled=true;
    //elem.parentElement.style.display = 'none';
    this.adminSevice.UpdateProduct(product).subscribe(
      {
        next:(data:any)=>{
          //this.Products = data.data;
          console.log("approve" , data.data);
        },
        error:(err : any)=>{
          console.error(err)}
      });
    //console.log(product)
    //call update function
  }
  rejectProduct(product:any){
    product.Status = "Rejected"
    this.adminSevice.UpdateProduct(product).subscribe(
      {
        next:(data:any)=>{
          //this.Products = data.data;
          console.log("reject" , data.data);
        },
        error:(err : any)=>{
          console.error(err)}
      });
    //console.log(product)
    //call update function
  }

  detailsProduct(product:any){
    this.router.navigateByUrl("ProductDetails/"+product._id);
  }
}
