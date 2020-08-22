import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../share/api.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {


  public title = '';
  public replays: any;
  public loading = true;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly apiService: ApiService) {
    console.log('Called Constructor');
    this.activatedRoute.queryParams.subscribe(params => {
      this.title = params.title;
      this.apiService.axios.get('search/replays', {params: {title: this.title}}).then((res) => {
        this.replays = res.data;
        this.loading = false;
      });
    });
  }

  pageUpdate(event: PageEvent){
    this.apiService.axios.get('search/replays',
      { params: { name: this.title, pageIndex: event.pageIndex, pageSize: event.pageSize}}
    ).then((res) => {
      this.replays = res.data;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

}
