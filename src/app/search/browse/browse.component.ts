import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../share/api.service';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Subscription, timer} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {

  public foods = [{
    value : 'aze',
    viewValue: 'aez'
  }];
  public title = '';
  public data: any;
  public languages: any[];
  public technologies: any[];
  public loading = true;
  public browseFormSubscribe: Subscription = Subscription.EMPTY;
  public browseForm = new FormGroup({
    title: new FormControl('', []),
    language: new FormControl('', []),
    technology: new FormControl('', []),
  });

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly apiService: ApiService) {
    Promise.all([this.apiService.axios.get('categorie').then((res) => {
      this.languages = res.data.languages;
      this.technologies = res.data.levels;
    }),
    this.loadLive()]).then(()=>{
      this.loading = false;
    });
  }

  loadLive(title?: string, language?: string, level?: string) {
    return this.apiService.axios.get('search/lives', {params: {
      title,
        language,
        level
    }}).then((res) => {
      this.data = res.data;
    });
  }

  pageUpdate(event: PageEvent){
    this.apiService.axios.get('search/lives', { params: {
        name: this.browseForm.get('title').value,
        pageIndex: event.pageIndex,
        pageSize: event.pageSize
      }}).then((res) => {
      this.data = res.data;
      this.loading = false;
    });
}
  ngOnDestroy() {
    this.browseFormSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.browseFormSubscribe = this.browseForm.valueChanges
      .pipe(debounce(() => timer(500)))
      .subscribe((values) => {
        console.log("CHANGE");
        this.loadLive(values.title, values.language, values.technology);
    });
  }

}
