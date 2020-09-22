import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../auth/login.service';
import {AuthenticationService} from '../../auth/authentication.service';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  public isLogin: boolean;

  public searchForm = new FormGroup({
    search: new FormControl('', [Validators.required])
  });

  constructor(private readonly loginService: LoginService,
              private readonly router: Router,
              private readonly authentificationService: AuthenticationService) {
    this.isLogin = authentificationService.isLogged();
  }

  searchSubmit(): void{
    this.router.navigate(['/search'], {
      queryParams: { title: this.searchForm.get('search').value}
    });
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
