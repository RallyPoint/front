import {Component, Input, OnInit} from '@angular/core';
import {Utils} from "../../share/utils";
import {environment} from "../../../environments/environment";

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
  public avatar: string;
  @Input()
  public pseudo: string;
  @Input()
  public title: string;
  @Input()
  public img?: string;
  @Input()
  public file?: string;
  @Input()
  public live: boolean;
  @Input()
  public tag: string[];


  ngOnInit(): void {
    if (!this.img && this.file){
      const baseUrlThumb = Utils.GetRandomOfArray(environment.vodUrl);
      this.img = baseUrlThumb + '/thumb/' + this.pseudo + '/' + this.file + '/thumb-1000.jpg';
    }
  }

}
