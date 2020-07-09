import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../share/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  public pending: boolean;
  public verified: boolean;
  public error: boolean;

  constructor(private readonly apiService: ApiService,
              private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pending = true;
    this.route.queryParams.subscribe(params => {
      this.apiService.axios.put('user/'+params['userId']+"/verify",{
        code: params['code']
      }).then((res)=>{
        this.pending = false;
        this.verified = true;
      }).catch((res)=>{
        this.error = true;
      });
    });
  }

}
