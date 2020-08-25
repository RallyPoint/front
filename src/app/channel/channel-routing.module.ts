import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChannelComponent} from './channel/channel.component';
import {ReplayComponent} from './replay/replay.component';
import {ChannelResolver} from './channel/channel.resolver';
//
const routes: Routes = [
  { path: 'channel/:liveName', component: ChannelComponent, resolve : {userChannel: ChannelResolver} },
  { path: 'replay/:replayId', component: ReplayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChannelRoutingModule { }
