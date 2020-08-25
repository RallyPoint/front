import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../share/api.service';
import { environment } from '../../../environments/environment';
import {Utils} from '../../share/utils';
import {query} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userLives: any[] = [];
  public userReplays: any[] = [];
  public mainUser: any;
  public now = new Date();

  constructor(private readonly apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.axios.get('search/lives').then((res) => {
      if (!res.data || !res.data.length){return; }
      this.apiService.axios.get(`${environment.statsLiveUrl}/stats`, {
        params : {
          channels : res.data.map((live) => live.user.pseudo)
        }
      }).catch((e) => null).then((resStats) => {
        console.log('LALALA');
        this.userLives = res.data.map((live) => {
          return Object.assign(live, {
            thumbnail: '/media/hls/' + live.user.pseudo + '-thumbnail.jpg',
            viwer : resStats ? resStats.data.find((stats) => stats.name === live.user.pseudo).viwer : null
          });
        });
      });
    });
    this.apiService.axios.get('replay').then((res) => {
      const baseUrlThumb = Utils.GetRandomOfArray(environment.vodUrl);
      this.userReplays = res.data.map((replay) => {
        return Object.assign(replay, {thumbnail: baseUrlThumb + '/thumb/' + replay.file + '/thumb-1000.jpg'});
      });
    });
    this.apiService.axios.get('lives/home/main').then((res) => {
      this.mainUser = res.data;
      this.mainUser.live.date = new Date(this.mainUser.live.date);
    });
  }

}
