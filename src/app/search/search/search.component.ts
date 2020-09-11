import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../share/api.service';
import {Utils} from "../../share/utils";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public title: string = "";
  public data: any;
  public loading: boolean = true;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly apiService: ApiService) {
    const baseUrlThumb = Utils.GetRandomOfArray(environment.vodUrl);
    this.activatedRoute.queryParams.subscribe(params => {
      this.title = params['title'];
      this.apiService.axios.get('search',{params:{title: this.title}}).then((res)=>{
        this.data = res.data;
        this.loading = false;
      });
    });
  }

  ngOnInit(): void {
  }

}
