import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: []
})
export class SignUpComponent implements OnInit{
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
