import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../share/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userLives: any[] = [];
  public mainUser: any;
  public now = new Date();

  constructor(private readonly apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.axios.get('lives').then((res) => {
      this.userLives = res.data;
    });
    this.apiService.axios.get('lives/home/main').then((res) => {
      this.mainUser = res.data;
      this.mainUser.live.date = new Date(this.mainUser.live.date);
    });
  }

}
