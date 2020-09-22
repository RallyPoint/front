import { Injectable } from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class FollowService {

  public myFollow: Promise<any[]>;

  constructor(private readonly httpClient: HttpClient,
              private readonly authenticationService: AuthenticationService) {
  }

  public get(): Promise<any[]>{
    if (!this.authenticationService.isLogged()){return Promise.resolve([]); }
    if (this.myFollow){return this.myFollow; }
    this.myFollow = this.httpClient.get(`${environment.apiUrl}/user/${this.authenticationService.dataValue.user.id}/follow`)
      .toPromise().then((data) => {
      return data as any;
    });
    return this.myFollow;
  }

  public follow(userId: string): Promise<boolean> {
    return this.httpClient.post(`${environment.apiUrl}/user/${this.authenticationService.dataValue.user.id}/follow`, {
      liveUserId: userId
    }).toPromise().then((data) => {
      //this.myFollow.push(res.data);
    }).then(() => true);
  }

  public unFollow(userId: string): Promise<boolean> {
    return this.httpClient.delete(`${environment.apiUrl}/user/${this.authenticationService.dataValue.user.id}/follow/${userId}`)
      .toPromise().then((data) => {
      //this.myFollow.push(res.data);
    }).then(() => true);
  }

  public isFollowed(userId: string): Promise<boolean>{
    return this.get().then((users) => {
      return !!users.find((follow) => follow.id == userId);
    });
  }
}
