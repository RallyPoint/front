import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../auth/login.service";
import {AuthenticationService} from "../../auth/authentication.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  public isLogin: boolean;

  constructor(private readonly loginService: LoginService,authentificationService: AuthenticationService) {
    this.isLogin = authentificationService.isLogged();
  }

  ngOnInit(): void {
  }

  singIn(){
    this.loginService.signIn();
  }

  login(): void{
    this.loginService.logIn();
  }

}
