import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../share/api.service';
import {PageEvent} from '@angular/material/paginator';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {


  public title = '';
  public replays: any;
  public loading = true;

  public searchForm = new FormGroup({
    search: new FormControl('', [Validators.required])
  });

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly apiService: ApiService) {
    console.log('Called Constructor');
    this.activatedRoute.queryParams.subscribe(params => {
      this.title = params.title;
      this.searchForm.get('search').setValue(params.title);
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

  searchSubmit(): void{
    this.router.navigate(['/replays'], {
      queryParams: { 'title': this.searchForm.get('search').value}
    });
    console.log(this.searchForm.getRawValue());
  }

  ngOnInit(): void {
  }

}
