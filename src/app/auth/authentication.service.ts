import {Inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DOCUMENT} from '@angular/common';
import {ApiService} from '../share/api.service';
import {AxiosError} from 'axios';
import {AuthenticationConstant} from './authentication.constant';

@Injectable()
export class AuthenticationService {

  constructor(public matDialog: MatDialog,  @Inject(DOCUMENT) private document: Document,
              protected readonly apiService: ApiService
  ) {
    this.loadAuth();
  }

  private static readonly STORAGE_KEY_STATE: string = 'github_state';

  public user: any;
  public token: string;


  public isLogged(): boolean{
    return !!this.token;
  }

  private refreshPage(){
    window.location.reload();
  }
  private getGithubAuthorizeUrl(state: string): string{
    return 'https://github.com/login/oauth/authorize?client_id=941edbebbc817c7684fc&scope=user,user:email&state=' + state;
  }

  public githubLogin(data?: any){
    return new Promise((resolve, reject) => {
      const state: string = Math.random().toString(36).substring(24);
      localStorage.setItem(AuthenticationService.STORAGE_KEY_STATE, state);
      this.document.open(this.getGithubAuthorizeUrl(state), 'Ratting', 'width=550,height=700,0,status=0,');
      if (window){
        window['cbSSO'] = (urlParams: URLSearchParams) => {
          this.apiService.axios.post('auth/github-login', {
            code : urlParams.get('code'),
            ...data
          }).then((res) => {
            resolve(res.data);
          }, (e: AxiosError) => {
            reject({
              miss: e.response.data.miss
            });
          });
        };
      }
    }).then((data: any) => {
      this.saveAuth(data.user, data.access_token);
      this.apiService.setToken(this.token);
      this.refreshPage();
      return data;
    });
  }

  loadAuth(): void{
    this.token = localStorage.getItem(AuthenticationConstant.STORAGE_KEY.TOKEN);
    this.user = JSON.parse(localStorage.getItem(AuthenticationConstant.STORAGE_KEY.USER));
    this.apiService.setToken(this.token);
  }

  saveAuth(user: any, token: string): void{
    this.user = user;
    this.token = token;
    localStorage.setItem(AuthenticationConstant.STORAGE_KEY.USER, JSON.stringify(user));
    localStorage.setItem(AuthenticationConstant.STORAGE_KEY.TOKEN, token);
  }

  logOut(){
    localStorage.removeItem(AuthenticationConstant.STORAGE_KEY.USER);
    localStorage.removeItem(AuthenticationConstant.STORAGE_KEY.TOKEN);
    window.location.href = '/';
  }

  login(email: string, password: string): Promise<void>{
    return this.apiService.axios.post('auth/login', {
      email,
      password
    }).then((res) => {
      this.saveAuth(res.data.user, res.data.access_token);
    }).then(() => {
      this.refreshPage();
    });
  }

  register(pseudo: string, password: string, email: string): Promise<boolean>{
    return this.apiService.axios.post('auth/register', {
      pseudo,
      password,
      email
    }).then(() => true);
  }

  resetPassword(email: string): Promise<boolean>{
    return this.apiService.axios.post('auth/resetPassword', {
      email
    }).then(() => true);
  }

}
