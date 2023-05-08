import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URLs} from './ServiceUrl'
@Injectable({
  providedIn: 'root'
})
export class CharityService {


  constructor(private readonly myClient: HttpClient) {}

  private readonly URL =URLs+ '/Charities'; //API



  GetCharityById(id:any) {
    console.log("Charity details services");

    return this.myClient.get(this.URL + '/ById/'+id, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  UpdateCharityByName(name:any , charity:any) {
    console.log("Charity update services");

    return this.myClient.put(this.URL + '/'+name , charity, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  AddCharity(charity:any) {
    console.log("Charity add services");
    return this.myClient.post(this.URL , charity, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  deleteCharity(Id:any){
    console.log("Charity add services");
    return this.myClient.delete(this.URL + "/By/Id/" +Id, {headers: {Authorizaion: "Bearer " +localStorage.getItem("UserToken")}});
  }
  GetAllCharities() {
    return this.myClient.get<any> (this.URL);

  }
  AddProductToCharity(CharityName:any,DonatedItem:any){
    return this.myClient.post(this.URL+"/"+CharityName,DonatedItem);
  }
}
