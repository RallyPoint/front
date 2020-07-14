import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LiveModule} from "./live/live.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthModule} from "./auth/auth.module";
import {ShareModule} from "./share/share.module";
import { FollowModule } from './follow/follow.module';
import { LayoutModule } from './layout/layout.module';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LiveModule,
    BrowserAnimationsModule,
    AuthModule,
    ShareModule,
    FollowModule,
    LayoutModule,
    AccountModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
