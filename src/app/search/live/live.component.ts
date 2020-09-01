import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../share/api.service";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  public title: string = "";
  public lives: any;
  public loading: boolean = true;

  public searchForm = new FormGroup({
    search: new FormControl('', [Validators.required])
  });

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly apiService: ApiService) {
    console.log('Called Constructor');
    this.activatedRoute.queryParams.subscribe(params => {
      this.title = params['title'];
      this.searchForm.get('search').setValue(params.title);
      this.apiService.axios.get('search/lives',{params:{title: this.title}}).then((res)=>{
        this.lives = res.data;
        this.loading = false;
      });
    });
  }

  searchSubmit(): void{
    this.router.navigate(['/lives'], {
      queryParams: { 'title': this.searchForm.get('search').value}
    });
    console.log(this.searchForm.getRawValue());
  }

  pageUpdate(event: PageEvent){
    this.apiService.axios.get('search/lives', { params: { name: this.title, pageIndex: event.pageIndex, pageSize: event.pageSize}}).then((res)=>{
      this.lives = res.data;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

}
