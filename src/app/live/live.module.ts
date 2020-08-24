import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelComponent } from './channel/channel.component';
import {ChatModule} from '../chat/chat.module';
import {AuthModule} from '../auth/auth.module';
import {ShareModule} from '../share/share.module';
import {LiveRoutingModule} from './live-routing.module';
import {FollowModule} from '../follow/follow.module';
import { PlayerComponent } from './player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReplayComponent } from './replay/replay.component';
import {MiniLiveComponent} from './mini-live/mini-live.component';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [ChannelComponent, PlayerComponent, ReplayComponent, MiniLiveComponent],
  exports: [
    ChannelComponent,
    PlayerComponent,
    MiniLiveComponent
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
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ]
})
export class LiveModule { }
