import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      console.log(data);
      this.mainUser = data.mainLive;
      this.userReplays = data.replays;
      this.userLives = data.lives;
    });
  }

}
