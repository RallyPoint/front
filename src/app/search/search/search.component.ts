import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Utils} from '../../share/utils';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public title: string = '';
  public data: any;
  public loading: boolean = true;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly httpClient: HttpClient) {
    const baseUrlThumb = Utils.GetRandomOfArray(environment.vodUrl);
    this.activatedRoute.queryParams.subscribe(params => {
      this.title = params.title;
      this.httpClient.get(`${environment.apiUrl}/search`, {
        params: {
          title: this.title
        }}).toPromise().then((data) => {
        this.data = data;
        this.loading = false;
      });
    });
  }

  ngOnInit(): void {
  }

}
