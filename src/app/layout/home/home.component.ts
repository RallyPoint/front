import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../share/api.service';
import { environment } from '../../../environments/environment';

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
    this.apiService.axios.get('lives').then((res) => {
      this.userLives = res.data.map((live) => {
        return Object.assign(live, {thumbnail: '/media/hls/' + live.user.pseudo + '-thumbnail.jpg'});
      });
    });
    this.apiService.axios.get('replay').then((res) => {
      this.userReplays = res.data.map((replay) => {
        return Object.assign(replay, {thumbnail: environment.movieUrl + '/thumb/' + replay.file + '/thumb-1000.jpg'});
      });
    });
    this.apiService.axios.get('lives/home/main').then((res) => {
      this.mainUser = res.data;
      this.mainUser.live.date = new Date(this.mainUser.live.date);
    });
  }

}
