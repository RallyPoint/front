import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {UserComponent} from './user/user.component';
import {LiveComponent} from './live/live.component';
import {IsConnectedGuard} from '../auth/IsConnected.guard';
import {ReplaysComponent} from './replays/replays.component';
import {ReplayComponent} from './replay/replay.component';

const routes: Routes = [
  { path: '', component: MainComponent , children: [
      {
        path: 'user', component: UserComponent
      },
      {
        path: 'stream', component: LiveComponent
      },
      {
        path: 'replays', component: ReplaysComponent
      },
      {
        path: 'replays/:replayId', component: ReplayComponent
      },
      {
        path: '', redirectTo: 'user', pathMatch: 'full'
      }
    ],
    canActivate: [
      IsConnectedGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
