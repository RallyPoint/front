import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../auth/authentication.service';
import {ApiService} from '../../share/api.service';
import {ActivatedRoute} from '@angular/router';
import {FollowService} from '../../follow/follow.service';
import {LoginService} from '../../auth/login.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  public userReplays: any;
  public userChannel: any;
  public isAuth = false;
  public followed: boolean;
  public now: Date = new Date();

  constructor(private readonly authService: AuthenticationService,
              private readonly loginService: LoginService,
              private readonly apiService: ApiService,
              private readonly followService: FollowService,
              private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isLogged();
    this.route.params.subscribe(params => {
      this.apiService.axios.get('lives/' + params.liveName).then((res) => {
        this.userChannel = res.data;
        this.apiService.axios.get('replay', {params: {user: res.data.id}}).then((res) => {
          this.userReplays = res.data;
        });
        this.userChannel.live.date = new Date(this.userChannel.live.date);
        this.followService.isFollowed(this.userChannel.id).then((status) => {
          this.followed = status;
        });
      });
    });
  }

  connexion(){
    this.loginService.logIn();
  }

  follow(){
    if (!this.isAuth){this.connexion(); }
    this.followService.follow(this.userChannel.id).then(() => {
      this.followed = true;
    });
  }

  unFollow(){
    this.followService.unFollow(this.userChannel.id).then(() => {
      this.followed = false;
    });
  }

  subscribe(){

  }
}
