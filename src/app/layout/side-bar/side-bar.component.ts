import { Component, OnInit } from '@angular/core';
import {FollowService} from '../../follow/follow.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  public full = true;
  public calendar: any[];
  public follows: IUser[] = [];
  constructor(private readonly followService: FollowService,
              private readonly httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get(`${environment.apiUrl}/search/calendar`, {params: { withUser : '1'}})
      .toPromise().then((data: any) => {
      this.calendar = data;
    });
    this.followService.get().then((users) => {
      const followOnline = users.filter((user) => user.live.status);
      if (followOnline.length === 0){
        this.follows = users;
        return;
      }
      this.httpClient.get(`${environment.statsLiveUrl}/stats`, {
        params : { channels : users.map((user) => user.pseudo) }
      }).toPromise().then((dataStats: any) => {
        this.follows = users.map((user) => {
          return Object.assign(user, {
            viwer : dataStats ? dataStats.find((stats) => stats.name === user.pseudo).viwer : null
          });
        });
      }).catch(() => {
        this.follows = users;
      });
    });
  }

}

export interface Live {
  id: string;
  date: Date;
  desc: string;
  status: boolean;
  title: string;
}

export interface IUser {
  id: string;
  pseudo: string;
  avatar: string;
  sso: string;
  roles: string[];
  live: Live;
}


