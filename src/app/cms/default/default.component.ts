import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../share/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  content: string = "";

  constructor(private readonly apiService: ApiService,
              private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.apiService.axios.get("cms/"+params.slug).then((res)=>{
        this.content = res.data.content;
      });
    });
  }

}
