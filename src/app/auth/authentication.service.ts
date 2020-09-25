import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import {DOCUMENT} from '@angular/common';
import {AuthenticationConstant} from './authentication.constant';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthentificationModel} from './authentification.model';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class AuthenticationService {


  private static readonly STORAGE_KEY_STATE: string = 'github_state';

  private dataSubject: BehaviorSubject<AuthentificationModel>;
  public data: Observable<AuthentificationModel>;
  private initialized: boolean = false;
  private connected: boolean = false;

  constructor(public matDialog: MatDialog,  @Inject(DOCUMENT) private document: Document,
              protected readonly httpClient: HttpClient,
              @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.dataSubject = new BehaviorSubject<AuthentificationModel>(this.loadAuth());
    this.data = this.dataSubject.asObservable();
    this.data.subscribe(this.onDataChange.bind(this));
  }

  public onDataChange(data: AuthentificationModel): void {
    if (data) {
      const tokenData: { exp: number } = jwt_decode(data.accessToken);
      setTimeout(this.refreshToken.bind(this), tokenData.exp * 1000 - Date.now());
    }
    if (!this.initialized){
      this.connected = !!data;
      this.initialized = true;
      return;
    }
    this.saveAuth(data);
    if(this.connected !== !!data){
      this.refreshPage();
    }
  }

  private refreshToken(){
    this.httpClient.post(`${environment.apiUrl}/auth/refresh`,
      { refreshToken : this.dataValue.refreshToken}).toPromise()
      .then((data: AuthentificationModel) => {
        this.dataSubject.next(data);
      });
  }

  public get dataValue(): AuthentificationModel {
    return this.dataSubject.value;
  }

  public isLogged(): boolean{
    return !!this.dataValue && !!!!this.dataValue.user;
  }
  private refreshPage(){
    window.location.reload();
  }
  private getGithubAuthorizeUrl(state: string): string{
    return 'https://github.com/login/oauth/authorize?client_id=' + environment.githubKey + '&scope=read:user&state=' + state;
  }

  public githubLogin(data?: any){
    return new Promise((resolve, reject) => {
      if (!isPlatformBrowser(this.platformId)){
        return reject({miss: ''});
      }
      const state: string = Math.random().toString(36).substring(24);
      localStorage.setItem(AuthenticationService.STORAGE_KEY_STATE, state);
      this.document.open(this.getGithubAuthorizeUrl(state), 'Ratting', 'width=550,height=700,0,status=0,');
      if (window){
        window['cbSSO'] = (urlParams: URLSearchParams) => {
          this.httpClient.post(`${environment.apiUrl}/auth/github-login`, {
            code : urlParams.get('code'),
            ...data
          }).toPromise().then((dataRep: any) => {
            resolve(dataRep);
          }, (e) => {
            reject({
              miss: e.error.miss
            });
          });
        };
      }
    }).then((dataRep: AuthentificationModel) => {
      this.dataSubject.next(dataRep);
      return dataRep;
    });
  }

  loadAuth(): AuthentificationModel{
    if (!isPlatformBrowser(this.platformId)){ return ; }
    const data: AuthentificationModel = JSON.parse(localStorage.getItem(AuthenticationConstant.STORAGE_KEY.AUTHENTIFICATION));
    return !data || (jwt_decode(data.accessToken) as {exp: number}).exp * 1000 < Date.now() ? null : data;
  }

  saveAuth(data: AuthentificationModel): void{
    if (!isPlatformBrowser(this.platformId)){ return ; }
    localStorage.setItem(AuthenticationConstant.STORAGE_KEY.AUTHENTIFICATION, JSON.stringify(data));
  }

  logOut(){
    if (!isPlatformBrowser(this.platformId)){ return ; }
    localStorage.removeItem(AuthenticationConstant.STORAGE_KEY.AUTHENTIFICATION);
    window.location.href = '/';
  }

  login(email: string, password: string): Promise<void>{
    return this.httpClient.post<AuthentificationModel>(`${environment.apiUrl}/auth/login`, {
      email,
      password
    }).toPromise().then((data: AuthentificationModel) => {
      this.dataSubject.next(data);
    });
  }

  register(pseudo: string, password: string, email: string): Promise<boolean>{
    return this.httpClient.post(`${environment.apiUrl}/auth/register`, {
      pseudo,
      password,
      email
    }).toPromise().then(() => true);
  }

  resetPassword(email: string): Promise<boolean>{
    return this.httpClient.post(`${environment.apiUrl}/auth/resetPassword`, {
      email
    }).toPromise().then(() => true);
  }

}
