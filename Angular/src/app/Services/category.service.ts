import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {URLs} from './ServiceUrl'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly myClient: HttpClient, private router: Router) {}

  private readonly URL =URLs+'/Catigories'; //API

  GetAllCategories() {
    return this.myClient.get(this.URL);
  }

  AddNewCategory(category: any) {
    return this.myClient.post(this.URL, category, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }

  GetCategoryByName(categoryName:any){
    return this.myClient.get(this.URL+"/"+categoryName, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }

  UpdateCategory(categoryName: any, category:any) {
    return this.myClient.put(this.URL+"/"+categoryName, category, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }

  DeleteCategory(categoryName:any){
    return this.myClient.delete(this.URL+"/"+categoryName, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
}
