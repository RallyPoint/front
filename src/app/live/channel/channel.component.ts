import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../auth/authentication.service";
import {ApiService} from "../../share/api.service";
import {ActivatedRoute} from "@angular/router";
import {FollowService} from "../../follow/follow.service";
import {LoginService} from "../../auth/login.service";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {


  public userChannel: any;
  public isAuth: boolean = false;
  public followed: boolean;

  constructor(private readonly authService: AuthenticationService,
              private readonly loginService: LoginService,
              private readonly apiService: ApiService,
              private readonly followService: FollowService,
              private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isLogged();
    this.route.params.subscribe(params => {
      console.log(params);
      this.apiService.axios.get('lives/'+params['liveName']).then((res)=>{
        this.userChannel = res.data;
        this.followed = this.followService.isFollowed(this.userChannel.id);
      });
    });
  }

  connexion(){
    this.loginService.logIn();
  }

  follow(){
    this.followService.follow(this.userChannel.id).then(()=>{
      this.followed = true;
    })
  }

  unFollow(){
    this.followService.unFollow(this.userChannel.id).then(()=>{
      this.followed = false;
    })
  }

  subscribe(){

  }
}
