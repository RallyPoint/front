import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatModule} from '../chat/chat.module';
import {AuthModule} from '../auth/auth.module';
import {ShareModule} from '../share/share.module';
import {FollowModule} from '../follow/follow.module';
import { PlayerComponent } from './player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MiniLiveComponent} from './mini-live/mini-live.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [ PlayerComponent,  MiniLiveComponent],
  exports: [
    PlayerComponent,
    MiniLiveComponent
  ],
  imports: [
    CommonModule,
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
