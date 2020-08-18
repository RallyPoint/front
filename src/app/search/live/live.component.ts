import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../share/api.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  public title: string = "";
  public lives: any;
  public loading: boolean = true;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly apiService: ApiService) {
    console.log('Called Constructor');
    this.activatedRoute.queryParams.subscribe(params => {
      this.title = params['title'];
      this.apiService.axios.get('search/lives',{params:{title: this.title}}).then((res)=>{
        this.lives = res.data;
        this.loading = false;
      });
    });
  }

  pageUpdate(event: PageEvent){
    this.apiService.axios.get('search/lives', { params: { name: this.title, pageIndex: event.pageIndex, pageSize: event.pageSize}}).then((res)=>{
      this.lives = res.data;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

}
