import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mini-live',
  templateUrl: './mini-live.component.html',
  styleUrls: ['./mini-live.component.scss']
})
export class MiniLiveComponent implements OnInit {

  constructor() { }

  @Input()
  public spec: number;
  @Input()
  public pseudo: string;
  @Input()
  public title: string;
  @Input()
  public img: string;
  @Input()
  public tag: string[];


  ngOnInit(): void {
  }

}
