import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../share/api.service';
import { environment } from '../../../environments/environment';
import {Utils} from '../../share/utils';
import {query} from '@angular/animations';
import {ActivatedRoute} from "@angular/router";

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

  constructor(private readonly apiService: ApiService,
              private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      this.mainUser = data.mainLive;
      this.userReplays = data.replays;
      this.userLives = data.lives;
    });
  }

}
