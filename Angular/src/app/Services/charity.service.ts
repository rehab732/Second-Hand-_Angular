import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharityService {

  constructor(private readonly myClient: HttpClient) {}

  private readonly URL = 'http://localhost:7010/api/Charities'; //API

  GetCharities() {
    console.log("all Charities --> charity service");

    return this.myClient.get(this.URL);
  }

  GetCharityById(id:any) {
    console.log("Charity details services");

    return this.myClient.get(this.URL + '/ById/'+id);
  }
  UpdateCharityByName(name:any , charity:any) {
    console.log("Charity update services");

    return this.myClient.put(this.URL + '/'+name , charity);
  }
  AddCharity(charity:any) {
    console.log("Charity add services");
    return this.myClient.post(this.URL , charity);
  }
  deleteCharity(Id:any){
    console.log("Charity add services");
    return this.myClient.delete(this.URL + "/By/Id/" +Id);
  }
}
