import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../share/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userLives: any[]= [];

  constructor(private readonly apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.axios.get('lives').then((res)=>{
      this.userLives = res.data;
      console.log(this.userLives);
    });
  }

}
