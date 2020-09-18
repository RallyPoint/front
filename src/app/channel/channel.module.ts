import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChannelRoutingModule} from './channel-routing.module';
import {FollowModule} from '../follow/follow.module';
import {ChatModule} from '../chat/chat.module';
import {ShareModule} from '../share/share.module';
import {AuthModule} from '../auth/auth.module';
import {MatButtonModule} from '@angular/material/button';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {ChannelComponent} from './channel/channel.component';
import {ReplayComponent} from './replay/replay.component';
import {ChannelResolver} from "./channel/channel.resolver";
import {LiveModule} from "../live/live.module";
import {MatMenuModule} from "@angular/material/menu";
import { CalendarComponent } from './calendar/calendar.component';



@NgModule({
  declarations: [ChannelComponent, ReplayComponent, CalendarComponent],
  providers: [ChannelResolver],
  imports: [
    CommonModule,
    ChannelRoutingModule,
    FollowModule,
    ChatModule,
    ShareModule,
    AuthModule,
    MatButtonModule,
    NgScrollbarModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    LiveModule,
    MatMenuModule
  ]
})
export class ChannelModule { }
