import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  type:string="password";
  isText:boolean=false;
  icon:string="fa-eye-slash";
  constructor(){}
  ngOnInit():void {}
  HideShowPass(){
  this.isText =! this.isText;
  this.isText ? this.icon="fa-eye" : this.icon="fa-eye-slash";
  this.isText ? this.type="text" :this.type="password";
  }
}
