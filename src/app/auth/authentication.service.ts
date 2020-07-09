import {Inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LoginComponent} from "./login/login.component";
import {DOCUMENT} from "@angular/common";
import {ApiService} from "../share/api.service";
import {AxiosError} from "axios";
import {AuthenticationConstant} from "./authentication.constant";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public user : any;
  public token: string;

  private static readonly STORAGE_KEY_STATE: string = "github_state";

  constructor(public matDialog: MatDialog,  @Inject(DOCUMENT) private document: Document,
              protected readonly apiService: ApiService
  ) {
    this.loadAuth();
  }

  public signIn(): Promise<boolean>{
    this.openAuthModal(false);
    return ;
  }

  public logIn(): Promise<boolean>{
    console.log("azeeaz")
    this.openAuthModal(true);
    return ;
  }

  public openAuthModal(mode:boolean): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-login";
    dialogConfig.data = {
      mode
    };
    const modalDialog = this.matDialog.open(LoginComponent, dialogConfig);
  }

  isLogged(): boolean{
    return !!this.token;
  }


  private getGithubAuthorizeUrl(state: string): string{
    return "https://github.com/login/oauth/authorize?client_id=4b64a6e73596ba9eac5f&scope=user,user:email&state="+state;
  }
  githubLogin(data?:any){
    return new Promise((resolve, reject) => {
      const state : string = Math.random().toString(36).substring(24);
      localStorage.setItem(AuthenticationService.STORAGE_KEY_STATE,state);
      this.document.open(this.getGithubAuthorizeUrl(state),"Ratting","width=550,height=700,0,status=0,");
      if(window){
        window['cbSSO'] = (urlParams: URLSearchParams)=>{
          this.apiService.axios.post("auth/github-login",{
            code : urlParams.get('code'),
              ...data
          }).then((res)=>{
            resolve(res.data);
          },(e: AxiosError)=>{
            reject({
              miss: e.response.data.miss
            });
          })
        };
      }
    }).then((data: any)=>{
      this.saveAuth(data.user,data.access_token);
      this.apiService.setToken(this.token);
      return data;
    })
  }

  loadAuth(): void{
    this.token = localStorage.getItem(AuthenticationConstant.STORAGE_KEY.TOKEN);
    this.user = JSON.parse(localStorage.getItem(AuthenticationConstant.STORAGE_KEY.USER));
    this.apiService.setToken(this.token);
  }

  saveAuth(user:any,token: string): void{
    this.user = user;
    this.token = token;
    localStorage.setItem(AuthenticationConstant.STORAGE_KEY.USER,JSON.stringify(user));
    localStorage.setItem(AuthenticationConstant.STORAGE_KEY.TOKEN,token);
  }

  login(email: string, password: string): Promise<boolean>{
    return this.apiService.axios.post('auth/login',{
      email,
      password
    }).then((res)=>{
      this.saveAuth(res.data.user,res.data.access_token);
    }).then(()=>true);
  }

  register(pseudo: string, password: string, email: string): Promise<boolean>{
    return this.apiService.axios.post('auth/register',{
      pseudo,
      password,
      email
    }).then(()=>true);
  }

  resetPassword(email: string): Promise<boolean>{
    return this.apiService.axios.post('auth/resetPassword',{
      email: email
    }).then(()=>true);
  }

}
