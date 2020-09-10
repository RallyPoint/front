import {AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import * as io from 'socket.io-client';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Socket = SocketIOClient.Socket;
import {EditorComponent} from '../editor/editor.component';
import {LoginService} from '../../auth/login.service';
import {AuthenticationService} from '../../auth/authentication.service';
import { environment } from '../../../environments/environment';
import {NgScrollbar} from 'ngx-scrollbar';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  public channel: string;

  public banned: boolean = false;
  public isAdmin: boolean = false;

  public io: Socket;
  public messages: {uuid: string,  by: string, pseudo: string,color?:string, txt: string, voteCount: number, votes: {[index: string]: number}, voted: number, gist?: string}[] = [
    {pseudo: 'Maxence', color: "c4296d", by: 'azeaze', uuid: 'azeaze', txt: '@lesang2tmort parcequ\'il fais sont metier de streamer a perfection comme', voteCount: 0, votes: {}, voted: 0},
  ];
  public message: string;
  public autoScroll: boolean = true;
  @ViewChild(NgScrollbar, { static: true }) scrollbarRef: NgScrollbar;
  // tslint:disable-next-line:variable-name
  private _scrollSubscription = Subscription.EMPTY;
  // public socket: Socket;
  constructor(public matDialog: MatDialog,
              @Inject(PLATFORM_ID) private platformId: any,
              private readonly loginService: LoginService,
              private readonly authenticationService: AuthenticationService) {
  }

  ngAfterViewInit() {
    this._scrollSubscription = this.scrollbarRef.verticalScrolled.pipe(
      tap((e: any) => {
        this.autoScroll = e.target.scrollHeight === e.target.clientHeight + e.target.scrollTop;
      })
    ).subscribe();
  }
  ngOnInit(): void {
    this.connection();
    this.isAdmin = this.authenticationService.user.pseudo === this.channel;
  }
  ngOnDestroy() {
    this._scrollSubscription.unsubscribe();
  }

  public connection(){
    if(!isPlatformBrowser(this.platformId)){ return ; }
    this.io = io(environment.chatUrl, {query: 'channel=' + this.channel + '&auth_token=' + this.authenticationService.token});
    this.io.on('message', this.onMessage.bind(this));
    this.io.on('vote', this.onVote.bind(this));
    this.io.on('code', this.onCode.bind(this));
    this.io.on('admin', this.onAdmin.bind(this));
    this.io.on('systeme', this.onSysteme.bind(this));
  }

  public send(){
    if (!this.authenticationService.isLogged()) {
      return this.loginService.logIn();
    }
    this.io.emit('message', {txt: this.message});
    this.message = '';
  }

  public onCode(msg: {uuid: string, pseudo: string, color: string, txt: string, url: string, by: string}): void{
    this.messages.push({txt: msg.txt, color: msg.color, by: msg.by, voteCount: 0, votes: {}, voted : 0, uuid: msg.uuid, pseudo: msg.pseudo , gist: msg.url});
  }
  public onAdmin(msg: {uuid: string, by: string, forPseudo: string, pseudo: string, for: string, action: string}): void{
    this.messages.push({txt: 'Utilisateur ' + msg.forPseudo + ' banni', by: msg.by, voteCount: 0, votes: {}, voted : 0, uuid: msg.uuid, pseudo: msg.pseudo});
  }
  public onSysteme(msg: {uuid: string, by: string, forPseudo: string, pseudo: string, for: string, action: string}): void{
    this.banned = true;
  }
  public onMessage(msg: {uuid: string, color: string,  by: string, pseudo: string, txt: string}): void{
    this.messages.push({txt: msg.txt, color: msg.color, by: msg.by, pseudo: msg.pseudo, voteCount: 0, votes: {}, voted : 0, uuid: msg.uuid});
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
    message.voteCount += msg.vote ? 1 : -1;
  }

  public ban(userId: string, pseudo: string){
    this.io.emit('admin', {
      userId,
      pseudo,
      action: 'ban'
    });
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
    dialogConfig.width = "90%";
    dialogConfig.maxWidth = "500px";
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
