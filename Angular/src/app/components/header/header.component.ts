import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userToken: string | null = null;
  constructor() { }

  ngOnInit(): void {
    this.userToken = localStorage.getItem("UserToken");
  }

  logOut(){
    localStorage.removeItem("UserToken");
    location.reload();
  }

}
