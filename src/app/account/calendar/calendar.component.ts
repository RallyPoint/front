import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ApiService} from "../../share/api.service";
import {AuthenticationService} from "../../auth/authentication.service";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

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

  constructor(private readonly apiService: ApiService,
              private readonly authentificationService: AuthenticationService) { }

  public ngOnInit(): void {
    this.apiService.axios.get('categorie').then((res) => {
      this.languages = res.data.languages;
      this.categories = res.data.levels;
    });
    this.loadCalendar();
  }

  public loadCalendar():void{
    this.apiService.axios.get('search/calendar',{params:{userId:this.authentificationService.user.id}})
      .then((res)=>{
        this.calendarDate = res.data;
      })
  }

  public changeInformationdSubmit(): void{
    this.apiService.axios.post('calendar',this.changeInformationdForm.getRawValue()).then((res) => {
      this.succes = true;
    }, () => {
      this.succes = false;
    });
  }

  public delete(calendarId: string): void{
    this.apiService.axios.delete('calendar/' + calendarId).then(() => {
      this.loadCalendar();
    })
    //@todo: add error message for user in catch
  }
}
