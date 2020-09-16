import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../share/api.service';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Subscription, timer} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {

  @ViewChild('paginator')
  paginator: MatPaginator;
  public title = '';
  public data: any;
  public languages: any[];
  public technologies: any[];
  public loading = true;
  public browseFormSubscribe: Subscription = Subscription.EMPTY;
  public browseForm = new FormGroup({
    pseudo: new FormControl('', []),
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

  loadLive(pseudo?: string, language?: string, level?: string, pageIndex?: number, pageSize?: number) {
    return this.apiService.axios.get('search/users', {params: {
        pseudo,
        language,
        level,
        pageIndex,
        pageSize
      }}).then((res) => {
      this.data = res.data;
    });
  }

  pageUpdate(event: PageEvent){
    this.loadLive(
      this.browseForm.get('pseudo').value,
      this.browseForm.get('language').value,
      this.browseForm.get('technology').value,
      event.pageIndex,
      event.pageSize
    );
}
  ngOnDestroy() {
    this.browseFormSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.browseFormSubscribe = this.browseForm.valueChanges
      .pipe(debounce(() => timer(500)))
      .subscribe((values) => {
        this.paginator.pageIndex = 0;
        this.loadLive(values.pseudo, values.language, values.technology);
      });
  }

}
