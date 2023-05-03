import { Component, OnInit } from '@angular/core';
import jwt from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userToken: string | null = null;
  userId:any;
  constructor() { }

  ngOnInit(): void {
    this.userToken = localStorage.getItem("UserToken");
    if(this.userToken){

      this.userId = (jwt(this.userToken) as any).customerId;
      // this.userName = (jwt(this.userToken) as any).userName;

      console.log( this.userId);
    }
  }

  logOut(){
    localStorage.removeItem("UserToken");
    //location.reload();
  }

}
