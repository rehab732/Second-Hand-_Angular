import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  Category:any;
  name:any;

  constructor(activeRoute: ActivatedRoute
    , private categoryService:CategoryService, private router : Router) {

      this.name = activeRoute.snapshot.params["name"];
    }

  ngOnInit(): void {
    this.categoryService.GetCategoryByName(this.name).subscribe(
      {
        next:(data:any)=>{
          this.Category = data.data ;
          console.log(this.Category);
        },
        error:(err)=>{
          console.error(err)}
      })
  }

  update(name:any){
    this.categoryService.UpdateCategory(this.Category.name,
      {name}).subscribe(
      {
        next:(data:any)=>{
          console.log(data);
          this.router.navigateByUrl("admindashboard");
        },
        error:(err)=>{
          console.error(err)}
      })
    console.log("updated")
  }

}
