import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  public pending: boolean;
  public verified: boolean;
  public error: boolean;

  constructor(private readonly httpClient: HttpClient,
              private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pending = true;
    this.route.queryParams.subscribe(params => {
      this.httpClient.put(`${environment.apiUrl}/user/${params['userId']}/verify`, {
        code: params['code']
      }).toPromise().then((data) => {
        this.pending = false;
        this.verified = true;
      }).catch((res) => {
        this.error = true;
      });
    });
  }

}
