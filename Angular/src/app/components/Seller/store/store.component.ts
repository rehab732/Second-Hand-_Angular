import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Services/category.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  Categories:String[]=[];
  constructor(public myService:CategoryService){

    myService.GetAllCategories().subscribe(
      {
        next:(data:any)=>{
          console.log(data);
           for(var i in data["data"]){
              this.Categories.push(data["data"][i].name);
           }
           console.log(this.Categories);

        },
        error:(err)=>{
          console.error(err)}
      }
    )

  }


  ngOnInit(): void {
  }

}
