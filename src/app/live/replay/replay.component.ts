import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../auth/authentication.service';
import {LoginService} from '../../auth/login.service';
import {ApiService} from '../../share/api.service';
import {FollowService} from '../../follow/follow.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {

  public replay: any;
  public userReplays: any;
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
      this.apiService.axios.get('replay/' + params.replayId).then((res) => {
        this.replay = res.data;
        this.apiService.axios.get('replay', {params: {user: res.data.user.id}}).then((res) => {
          this.userReplays = res.data;
        });
        this.replay.date = new Date(this.replay.date);
        this.followService.isFollowed(this.replay.id).then((status) => {
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
    this.followService.follow(this.replay.user.id).then(() => {
      this.followed = true;
    });
  }

  unFollow(){
    this.followService.unFollow(this.replay.user.id).then(() => {
      this.followed = false;
    });
  }

}
