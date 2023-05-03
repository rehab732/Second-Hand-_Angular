import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService, private router:Router) { }

  errorMsg:any;

  ngOnInit(): void {
  }

  add(name:any){
    this.categoryService.AddNewCategory({name}).subscribe(
      {
        next:(data:any)=>{
          console.log(data);
          this.router.navigateByUrl("admindashboard");
        },
        error:(err)=>{
          this.errorMsg = "Please enter a category name";
          console.error(err)}
      })
    console.log("added")
  }

}
