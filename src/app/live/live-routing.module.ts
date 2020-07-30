import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChannelComponent} from './channel/channel.component';
import {ReplayComponent} from './replay/replay.component';

const routes: Routes = [
  { path: 'channel/:liveName', component: ChannelComponent },
  { path: 'replay/:replayId', component: ReplayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveRoutingModule { }
