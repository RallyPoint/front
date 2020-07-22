import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Socket = SocketIOClient.Socket;
import {EditorComponent} from "../editor/editor.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public io: Socket;
  public messages: {uuid:string,txt:string,voteCount:number,votes:{[index:string]:number},voted:number, gist?:string}[] = [
    {uuid:"azeaze",txt:"@lesang2tmort parcequ'il fais sont metier de streamer a perfection comme",voteCount:0,votes:{},voted:0},
    {uuid:"azeaze",txt:"@lesang2tmort parcequ'il fais sont metier de streamer a perfection comme",voteCount:0,votes:{},voted:0},
    {uuid:"azeaze",txt:"Je le vois de partout sur Twitter @Demenoss ^^",voteCount:0,votes:{},voted:0},
    {uuid:"azeaze",txt:"@lesang2tmort parcequ'il fais sont metier de streamer a perfection comme",voteCount:0,votes:{},voted:0}
    ];
  public message: string;
  private token: string = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNCIsImlhdCI6MTU5MTY5NjkyNH0.jU6m2PdRnWP64yeXsJBO94u-MAFgaOXc01cQLKSNrKaq_0hD3xBw0ddREXunPrdmLI9lLP1Qm7mL1lhu-acuQEU8r6LkfoW1JrWImnCX4UjYXyGBsvuhunSC-najNNwQRjXOJLZGcNdoCO4BcxLYZTMur6irhilKRKpUvoOOH3F8ymGr4Ts70epeY866cwujj61fUWbVwZdNzgtcblqjCndeKF5i1xlLGzjfnbeXr4kn2aioTFNcfrGhlRtWNIYaMSdUp06bzu1EHNSCRL7oGGkbj7AUqvP6EPvyAMKpmw3tBVwqtZ33p7iUrCboOqYcKspjKtuF15re9vNE1ko_2M3dhb_VvBwCFcgaAZz1vqfceGFV7G-HQXT5hxZEpMqg4oLDxhamp9f3pni_yYdnP1vi8BgqPxDOg0qrhprZzFKfrkeZl9wyz2zCUMaILhvJmI_WyoxQW6_Ywy7_C9tptunq6VJDPWmtPKM0zIb_SsuU6mNNhzsT6GmvStu3HxiRTHQXXM1YJO6HqcmWNdkfmtgZC3jgs7G9Korg5AWOMG3-sD7Qd8EbpcSvgXSCb4BBUvoINoYydXtDcTaoI03ZLjHQvLG_ovQcKHSZbmk0J-HwkPtSlXfzvgyPh8XcKqHrkU0ipwlqHQdNbdyr7OHxg6u6wGytmhLLdUAPTWUef9s";

  //public socket: Socket;
  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.connection();
  }

  public connection(){
    this.io = io("https://chat.rallypoint.tech",{query: 'channel=toto&auth_token='+this.token});
    this.io.on("message", this.onMessage.bind(this));
    this.io.on("vote", this.onVote.bind(this));
    this.io.on("code", this.onCode.bind(this));
  }

  public send(){
    this.io.emit("message",{txt:this.message});
    this.message = "";
  }

  public onCode(msg: {uuid:string, txt:string,url:string}): void{
    this.messages.push({txt:msg.txt,voteCount:0,votes:{},voted : 0,uuid:msg.uuid,gist:msg.url});
  }
  public onMessage(msg: {uuid:string, txt:string}): void{
    this.messages.push({txt:msg.txt,voteCount:0,votes:{},voted : 0,uuid:msg.uuid});
  }

  public onVote(msg: {uuid:string,vote:boolean,by:string}): void{
    // reverse Vote
    const message = this.findMessage(msg.uuid);
    if(!message){return;}
    console.log(message.votes[msg.by]);
    if(message.votes[msg.by] !== undefined){
      console.log("abort on vote");
      message.voteCount -= message.votes[msg.by];
    }
    // update vote
    message.votes[msg.by] = msg.vote ? 1 : -1;
    message.voteCount += message.votes[msg.by];
  }

  public vote(vote: boolean,uuid: string){
    // emit vote
    this.io.emit('vote',{uuid,vote:vote});
  }

  public openCodeEditor(){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.id = "modal-component";
    dialogConfig.data = {
      sendCode : this.sendData.bind(this)
    };
    //dialogConfig.height = "350px";
    //dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(EditorComponent, dialogConfig);
  }

  private sendData(code: string,language: string, message: string): void{
    this.io.emit('code',{
      txt: message,
      code: code,
      language: language
    })
  }

  private findMessage(uuid: string){
    return this.messages.find((message) => message.uuid === uuid);
  }
}
