import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService, private router:Router) { }

  errorMsg:any;
  IsAdmin:any ;
  token:any;

  ngOnInit(): void {
    this.token = localStorage.getItem("UserToken");
    const tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    this.IsAdmin = tokenInfo.isAdmin; // get isAdmin from token payload
  }

  add(name:any){
    this.categoryService.AddNewCategory({name}).subscribe(
      {
        next:(data:any)=>{
          console.log(data);
          console.log("added")
          this.router.navigateByUrl("admindashboard");
        },
        error:(err)=>{
          if(err.status==401){
            this.errorMsg = "You are not authorized to make this action";
          }else{
            this.errorMsg = "Please enter a category name";
          }
          console.error(err)}
      })
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
