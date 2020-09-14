import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthModule} from './auth/auth.module';
import {ShareModule} from './share/share.module';
import { LayoutModule } from './layout/layout.module';
import { AccountModule } from './account/account.module';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
import {LiveModule} from './live/live.module';
import {HomeLivesResolver, HomeMainLiveResolver, HomeReplaysResolver} from './layout/home/channel.resolver';
import {DefaultComponent} from './default.component';

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    DefaultComponent,
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    ShareModule,
    LayoutModule,
    AccountModule,
    LiveModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }, // replace "en-US" with your locale
    {provide: 'googleTagManagerId', useValue: 'GTM-N4BNPPG'},
    HomeReplaysResolver,
    HomeMainLiveResolver,
    HomeLivesResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
