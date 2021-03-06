import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {AuthenticationService} from '../../auth/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {FollowService} from '../../follow/follow.service';
import {LoginService} from '../../auth/login.service';
import {Utils} from '../../share/utils';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  public userReplays: any;
  public userChannel: any;
  public isAuth = false;
  public calendar: any[] = [];
  public followed: boolean;
  public displayTabMobile = false;
  public mediumQueryMoreInfo: boolean = false;
  public now: Date = new Date();

  constructor(private readonly authService: AuthenticationService,
              private readonly loginService: LoginService,
              private readonly httpClient: HttpClient,
              private readonly followService: FollowService,
              private readonly route: ActivatedRoute,
              private readonly meta: Meta) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isLogged();
    this.route.queryParams.subscribe((query) => {
      this.displayTabMobile = !!parseFloat(query.displayTabMobile);
    });
    this.route.data.subscribe( data => {
      this.httpClient.get(`${environment.apiUrl}/search/calendar`, { params: {
          userId: data.userChannel.id
        }}).toPromise().then((dataCalendar: any) => this.calendar = dataCalendar);
      this.userChannel = data.userChannel;
      this.meta.addTags([
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: environment.siteUrl + '/channel/' + this.userChannel.pseudo },
        { name: 'twitter:title', content: this.userChannel.live.title },
        { name: 'twitter:description', content: this.userChannel.live.desc },
        { name: 'twitter:image', content: this.userChannel.live.thumb ? this.userChannel.live.thumb : environment.siteUrl + '/media/avatar/' + this.userChannel.avatar},
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: environment.siteUrl + '/channel/' + this.userChannel.pseudo },
        { name: 'og:title', content: this.userChannel.live.title },
        { name: 'og:description', content: this.userChannel.live.desc },
        { name: 'og:image', content: this.userChannel.live.thumb ? this.userChannel.live.thumb : environment.siteUrl + '/media/avatar/' + this.userChannel.avatar},
        { name: 'title', content: this.userChannel.live.title },
        { name: 'description', content: this.userChannel.live.desc }
      ], true);
      this.route.params.subscribe(params => {
        this.httpClient.get(`${environment.apiUrl}/search/replays`, {params: {user: this.userChannel.pseudo}})
          .toPromise().then((dataReplay: any) => {
          const baseUrlThumb = Utils.GetRandomOfArray(environment.vodUrl);
          this.userReplays = dataReplay.items.map((replay) => {
            return Object.assign(replay, {thumbnail: baseUrlThumb + '/thumb/' + this.userChannel.pseudo + '/' + replay.file + '/thumb-1000.jpg'});
          });
        });
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
