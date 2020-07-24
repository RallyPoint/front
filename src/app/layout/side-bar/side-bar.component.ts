import { Component, OnInit } from '@angular/core';
import {FollowService} from '../../follow/follow.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  public full = true;
  public follows: IUser[] = [];
  constructor(private readonly followService: FollowService) { }

  ngOnInit(): void {
    this.followService.get().then((users) => {
      this.follows = users;
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


