import { Injectable } from '@angular/core';
import {ApiService} from '../share/api.service';
import {AuthenticationService} from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  public myFollow: Promise<any[]>;

  constructor(private readonly apiService: ApiService,
              private readonly authenticationService: AuthenticationService) {
  }

  public get(): Promise<any[]>{
    if (!this.authenticationService.isLogged()){return Promise.resolve([]); }
    if (this.myFollow){return this.myFollow; }
    this.myFollow = this.apiService.axios.get(`user/${this.authenticationService.user.id}/follow`).then((res) => {
      return res.data as any;
    });
    return this.myFollow;
  }

  public follow(userId: string): Promise<boolean> {
    return this.apiService.axios.post(`user/${this.authenticationService.user.id}/follow`, {
      liveUserId: userId
    }).then((res) => {
      //this.myFollow.push(res.data);
    }).then(() => true);
  }

  public unFollow(userId: string): Promise<boolean> {
    return this.apiService.axios.delete(`user/${this.authenticationService.user.id}/follow/${userId}`).then((res) => {
      //this.myFollow.push(res.data);
    }).then(() => true);
  }

  public isFollowed(userId: string): Promise<boolean>{
    return this.get().then((users)=>{
      return !!users.find((follow) => follow.id = userId);
    })
  }
}
