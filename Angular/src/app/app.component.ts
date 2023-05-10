import { Component,Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularecommerce';
  token:any;
  router: string;
  IsAdmin:any ;

  constructor(
    public _router: Router
 )
 {
  this.router = _router.url;
 }
  ngOnInit(): void {
    this.token = localStorage.getItem("UserToken");
    const tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    if(tokenInfo) this.IsAdmin = tokenInfo.isAdmin; // get isAdmin from token payload
}

 getDecodedAccessToken(token: string): any {
  try {
    return jwtDecode(token);
  } catch (Error) {
    return null;
  }
}


}
