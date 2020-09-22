import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  content: string = '';

  constructor(private readonly httpClient: HttpClient,
              private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.httpClient.get(`${environment.apiUrl}/cms/${params.slug}`).toPromise().then((data: any) => {
        this.content = data.content;
      });
    });
  }

}
