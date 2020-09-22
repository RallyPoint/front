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
      this.httpClient.get(`${environment.apiUrl}/search/lives`, {params: {title: this.title}})
        .toPromise().then((data) => {
        this.lives = data;
        this.loading = false;
      });
    });
  }

  searchSubmit(): void{
    this.router.navigate(['/lives'], {
      queryParams: { title: this.searchForm.get('search').value}
    });
  }

  pageUpdate(event: PageEvent){
    this.httpClient.get(`${environment.apiUrl}/search/lives`, {
      params: {
        name: this.title,
        pageIndex: event.pageIndex.toString(),
        pageSize: event.pageSize.toString()
      }}).toPromise().then((data) => {
      this.lives = data;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

}
