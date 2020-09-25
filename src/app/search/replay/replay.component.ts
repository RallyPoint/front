import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {


  public defaultPageSize: number = 20;
  public title = '';
  public replays: any;
  public loading = true;

  public searchForm = new FormGroup({
    search: new FormControl('', [Validators.required])
  });

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly httpClient: HttpClient) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.title = params.title;
      this.searchForm.get('search').setValue(params.title);
      this.loadLive(this.title);
    });
  }

  pageUpdate(event: PageEvent){
    this.loadLive(this.title, event.pageIndex, event.pageSize);
  }

  loadLive(title: string= '', pageIndex: number = 0, pageSize: number = this.defaultPageSize) {
    this.loading = true;
    this.httpClient.get(`${environment.apiUrl}/search/replays`,
      { params: {
          title: this.title,
          pageIndex : pageIndex.toString(),
          pageSize: pageSize.toString()
        }
      }
    ).toPromise().then((data) => {
      this.replays = data;
      this.loading = false;
    });
  }

  searchSubmit(): void{
    this.router.navigate(['/replays'], {
      queryParams: { title: this.searchForm.get('search').value}
    });
  }

  ngOnInit(): void {
  }

}
