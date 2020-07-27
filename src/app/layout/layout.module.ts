import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { MiniLiveComponent } from './mini-live/mini-live.component';
import {AuthModule} from "../auth/auth.module";
import {RouterModule} from "@angular/router";
import {NgScrollbarModule} from "ngx-scrollbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FollowModule} from "../follow/follow.module";
import {LiveModule} from "../live/live.module";



@NgModule({
  declarations: [TopBarComponent, SideBarComponent, HomeComponent, MiniLiveComponent],
  exports: [
    TopBarComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule,
    NgScrollbarModule,
    MatButtonModule,
    MatIconModule,
    FollowModule,
    LiveModule
  ]
})
export class LayoutModule { }
