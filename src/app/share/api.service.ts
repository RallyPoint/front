import { Injectable } from '@angular/core';

import axios from "axios";
import { AxiosInstance } from "axios";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({baseURL:environment.apiUrl});
  }

  public setToken(token: string){
    if(!token){
      delete this.axios.defaults.headers.common['Authorization'];
    }else{
      this.axios.defaults.headers.common['Authorization'] = "Bearer "+token;
    }
  }

}
