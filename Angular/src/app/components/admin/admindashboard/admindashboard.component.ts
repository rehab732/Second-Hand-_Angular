import { AfterViewInit, Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';

export enum Admincomponents {
  AllProducts = 1,
  AllCustomers,
  AllCharites,
  Orders,
}

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
})
export class AdmindashboardComponent implements OnInit, AfterViewInit {
  constructor() {}
  ngAfterViewInit(): void {
    if(this.IsAdmin){
      console.log("IsAdmin " + this.IsAdmin)
      const sidebar = document.querySelector('.sidebar')!;
      const closeBtn = document.querySelector('#btn')!;
      const searchBtn = document.querySelector('.bx-search')!;

      this.currentpage = Admincomponents.AllProducts;

      closeBtn.addEventListener('click', function () {
        sidebar.classList.toggle('open');
        menuBtnChange();
      });

      /*
      searchBtn.addEventListener('click', function () {
        sidebar.classList.toggle('open');
        menuBtnChange();
      });*/

      function menuBtnChange() {
        if (sidebar.classList.contains('open')) {
          closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
        } else {
          closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
        }
      }
    }
  }

  public currentpage: any = 0;
  IsAdmin:any ;
  token:any;

  ngOnInit(): void {

    this.token = localStorage.getItem("UserToken");
    const tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    this.IsAdmin = tokenInfo.isAdmin; // get isAdmin from token payload

  }

  logout(){
    localStorage.removeItem("UserToken");
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
