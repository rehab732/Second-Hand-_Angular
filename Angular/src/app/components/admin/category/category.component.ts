import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService, private router:Router) { }

  Categories:any;

  ngOnInit(): void {
    this.categoryService.GetAllCategories().subscribe(
      {
        next:(data:any)=>{
          this.Categories = data.data;
          console.log(this.Categories);
        },
        error:(err)=>{
          console.error(err)}
      })
  }

  updateCategory(category:any){
    this.router.navigateByUrl("category-update/"+category.name);
  }
  add(){
    this.router.navigateByUrl("category-add");
  }
  deleteCategory(category:any, btn:any){
    // console.log(btn.parentElement)
    if(confirm("Are you sure you want to delete this category?")){
      this.categoryService.DeleteCategory(category.name).subscribe(
        {
          next:(data:any)=>{
            console.log(data);
            window.location.reload();
            // this.router.navigateByUrl("charity");
          },
          error:(err)=>{
            console.error(err)}
        })
      console.log("deleted")
    }
  }
  /*
  details(category:any){
    this.router.navigateByUrl("category-details/"+category.name);
  }*/

}
