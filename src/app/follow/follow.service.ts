import { Injectable } from '@angular/core';
import {ApiService} from "../share/api.service";
import {AuthenticationService} from "../auth/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  public myFollow : any[] = [];

  constructor(private readonly apiService: ApiService,
              private readonly authenticationService: AuthenticationService) {
    if(!this.authenticationService.isLogged()){return;}
    this.apiService.axios.get(`user/${this.authenticationService.user.id}/follow`).then((res)=>{
      this.myFollow = <any>res.data;
    });
  }

  public follow(userId: string): Promise<boolean> {
    return this.apiService.axios.post(`user/${this.authenticationService.user.id}/follow`,{
      liveUserId: userId
    }).then((res)=>{
      this.myFollow.push(res.data);
    }).then(()=>true);
  }

  public unFollow(userId: string): Promise<boolean> {
    return this.apiService.axios.delete(`user/${this.authenticationService.user.id}/follow/${userId}`).then((res)=>{
      this.myFollow.push(res.data);
    }).then(()=>true);
  }

  public isFollowed(userId: string): boolean{
    return !!this.myFollow.find((follow)=>follow.id = userId);
  }
}
