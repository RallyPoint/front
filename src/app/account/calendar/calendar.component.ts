import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../auth/authentication.service';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public categories: any[] = [];
  public languages: any[] = [];
  public succes: boolean;
  public calendarDate: any[] = [];

  public minDate: Date = new Date();
  public startDate: Date = new Date();
  public changeInformationdForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
  }, [(control: FormGroup): ValidationErrors | null => {
    return null;
  }]);

  constructor(private readonly httpClient: HttpClient,
              private readonly authentificationService: AuthenticationService) { }

  public ngOnInit(): void {
    this.httpClient.get(`${environment.apiUrl}/categorie`).toPromise().then((data: any) => {
      this.languages = data.languages;
      this.categories = data.levels;
    });
    this.loadCalendar();
  }

  public loadCalendar(): void{
    this.httpClient.get(`${environment.apiUrl}/search/calendar`,
      {params:
          { userId: this.authentificationService.dataValue.user.id}})
      .toPromise().then((data: any) => {
        this.calendarDate = data;
      });
  }

  public changeInformationdSubmit(): void{
    this.httpClient.post(`${environment.apiUrl}/calendar`, this.changeInformationdForm.getRawValue())
      .toPromise().then((res) => {
      this.succes = true;
      this.loadCalendar();
    }, () => {
      this.succes = false;
    });
  }

  public delete(calendarId: string): void{
    this.httpClient.delete(`${environment.apiUrl}/calendar/${calendarId}`)
      .toPromise().then(() => {
      this.loadCalendar();
    });
  }
}
