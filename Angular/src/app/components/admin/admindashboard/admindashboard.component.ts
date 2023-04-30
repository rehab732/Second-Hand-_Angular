import { Component, OnInit } from '@angular/core';

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
export class AdmindashboardComponent implements OnInit {
  constructor() {}

  public currentpage: any = 0;

  ngOnInit(): void {
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
  logout(){
    localStorage.removeItem("UserToken");
  }
}
