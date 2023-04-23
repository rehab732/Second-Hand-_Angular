import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly myClient: HttpClient, private router: Router) {}

  private readonly URL = 'http://localhost:7010/api/Catigories'; //API

  GetAllCategories() {
    return this.myClient.get(this.URL);
  }
}
