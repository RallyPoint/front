import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  public defaultPageSize: number = 20;
  public title: string = '';
  public lives: any;
  public loading: boolean = true;

  public searchForm = new FormGroup({
    search: new FormControl('', [Validators.required])
  });

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly httpClient: HttpClient) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.title = params['title'];
      this.searchForm.get('search').setValue(params.title);
      this.loadLive(this.title);
    });
  }

  searchSubmit(): void{
    this.router.navigate(['search/lives'], {
      queryParams: { title: this.searchForm.get('search').value}
    });
  }


  loadLive(title: string = '', pageIndex: number = 0, pageSize: number = this.defaultPageSize) {
    this.loading = true;
    return this.httpClient.get(`${environment.apiUrl}/search/lives`, {
      params: {
        title: this.title,
        pageIndex: pageIndex.toString(),
        pageSize: pageSize.toString()
      }}).toPromise().then((data: any) => {
      this.lives = data;
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

  pageUpdate(event: PageEvent){
    this.loadLive(this.title, event.pageIndex, event.pageSize);
  }

  ngOnInit(): void {
  }

}
