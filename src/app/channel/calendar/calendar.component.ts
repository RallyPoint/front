import {Component, Input, OnInit} from '@angular/core';
import { ICalendar, GoogleCalendar } from 'datebook';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input('date')
  date: any;

  constructor() { }

  ngOnInit(): void {
  }

  public outlook(date): void{
    new ICalendar({
      title: date.title,
      description: date.desc,
      start: date.start,
      end: date.end
    }).download();
  }

  public google(date): void{
    window.open(new GoogleCalendar({
      title: date.title,
      description: date.desc,
      start: date.start,
      end: date.end
    }).render());
  }

}
