import { Component, OnInit } from '@angular/core';
import {FollowService} from '../../follow/follow.service';
import {environment} from "../../../environments/environment";
import {ApiService} from "../../share/api.service";

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
              private readonly apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.axios.get('search/calendar',{params: {withUser: 1}}).then((res) => {
      this.calendar = res.data;
    });
      this.followService.get().then((users) => {
      const followOnline = users.filter((user) => user.live.status);
      if (followOnline.length === 0){
        this.follows = users;
        return;
      }
      this.apiService.axios.get(`${environment.statsLiveUrl}/stats`, {
        params : { channels : users.map((user) => user.pseudo) }
      }).then((resStats) => {
        this.follows = users.map((user) => {
          return Object.assign(user,{
            viwer : resStats ? resStats.data.find((stats) => stats.name === user.pseudo).viwer : null
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


