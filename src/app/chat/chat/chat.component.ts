import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as io from 'socket.io-client';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Socket = SocketIOClient.Socket;
import {EditorComponent} from '../editor/editor.component';
import {LoginService} from '../../auth/login.service';
import {AuthenticationService} from '../../auth/authentication.service';
import { environment } from '../../../environments/environment';
import {NgScrollbar} from "ngx-scrollbar";
import {tap} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  public channel: string;

  public io: Socket;
  public messages: {uuid: string, pseudo: string, txt: string, voteCount: number, votes: {[index: string]: number}, voted: number, gist?: string}[] = [
    ];
  public message: string;
  public autoScroll: boolean;
  @ViewChild(NgScrollbar, { static: true }) scrollbarRef: NgScrollbar;
  // tslint:disable-next-line:variable-name
  private _scrollSubscription = Subscription.EMPTY;
  // public socket: Socket;
  constructor(public matDialog: MatDialog,
              private readonly loginService: LoginService,
              private readonly authenticationService: AuthenticationService) { }

  ngAfterViewInit() {
    this._scrollSubscription = this.scrollbarRef.verticalScrolled.pipe(
      tap((e: any) => {
        this.autoScroll = e.target.scrollHeight === e.target.clientHeight+e.target.scrollTop;
      })
    ).subscribe();
  }
  ngOnInit(): void {
    this.connection();
  }
  ngOnDestroy() {
    this._scrollSubscription.unsubscribe();
  }

  public connection(){
    this.io = io(environment.chatUrl, {query: 'channel='+this.channel+'&auth_token=' + this.authenticationService.token});
    this.io.on('message', this.onMessage.bind(this));
    this.io.on('vote', this.onVote.bind(this));
    this.io.on('code', this.onCode.bind(this));
  }

  public send(){
    if (!this.authenticationService.isLogged()) {
      return this.loginService.logIn();
    }
    this.io.emit('message', {txt: this.message});
    this.message = '';
  }

  public onCode(msg: {uuid: string, pseudo: string, txt: string, url: string}): void{
    this.messages.push({txt: msg.txt, voteCount: 0, votes: {}, voted : 0, uuid: msg.uuid, pseudo: msg.pseudo , gist: msg.url});
  }
  public onMessage(msg: {uuid: string, pseudo: string, txt: string}): void{
    this.messages.push({txt: msg.txt, pseudo: msg.pseudo, voteCount: 0, votes: {}, voted : 0, uuid: msg.uuid});
  }

  public onVote(msg: {uuid: string, vote: boolean, by: string}): void{
    // reverse Vote
    const message = this.findMessage(msg.uuid);
    if (!message){return; }
    if (message.votes[msg.by] !== undefined){
      message.voteCount -= message.votes[msg.by];
    }
    // update vote
    message.votes[msg.by] = msg.vote ? 1 : -1;
    message.voteCount += message.votes[msg.by];
  }

  public vote(vote: boolean, uuid: string){
    if (!this.authenticationService.isLogged()) {
      return this.loginService.logIn();
    }
    // emit vote
    this.io.emit('vote', {uuid, vote});
  }

  public openCodeEditor(){
    if (!this.authenticationService.isLogged()) {
      return this.loginService.logIn();
    }
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.id = 'modal-component';
    dialogConfig.data = {
      sendCode : this.sendData.bind(this)
    };
    // dialogConfig.height = "350px";
    // dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(EditorComponent, dialogConfig);
  }

  private sendData(code: string, language: string, message: string): void{
    this.io.emit('code', {
      txt: message,
      code,
      language
    });
  }

  private findMessage(uuid: string){
    return this.messages.find((message) => message.uuid === uuid);
  }
}
