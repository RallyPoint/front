import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelComponent } from './channel/channel.component';
import {ChatModule} from "../chat/chat.module";
import {AuthModule} from "../auth/auth.module";
import {ShareModule} from "../share/share.module";
import {LiveRoutingModule} from "./live-routing.module";
import {FollowModule} from "../follow/follow.module";



@NgModule({
  declarations: [ChannelComponent],
  exports: [
    ChannelComponent
  ],
  imports: [
    CommonModule,
    LiveRoutingModule,
    FollowModule,
    ChatModule,
    ShareModule,
    AuthModule
  ]
})
export class LiveModule { }
