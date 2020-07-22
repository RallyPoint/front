import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelComponent } from './channel/channel.component';
import {ChatModule} from "../chat/chat.module";
import {AuthModule} from "../auth/auth.module";
import {ShareModule} from "../share/share.module";
import {LiveRoutingModule} from "./live-routing.module";
import {FollowModule} from "../follow/follow.module";
import { PlayerComponent } from './player/player.component';
import {MatButtonModule} from "@angular/material/button";
import {NgScrollbarModule} from "ngx-scrollbar";
import {MatTabsModule} from "@angular/material/tabs";



@NgModule({
  declarations: [ChannelComponent, PlayerComponent],
  exports: [
    ChannelComponent
  ],
  imports: [
    CommonModule,
    LiveRoutingModule,
    FollowModule,
    ChatModule,
    ShareModule,
    AuthModule,
    MatButtonModule,
    NgScrollbarModule,
    MatTabsModule
  ]
})
export class LiveModule { }
