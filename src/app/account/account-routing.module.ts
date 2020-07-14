import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {UserComponent} from "./user/user.component";
import {LiveComponent} from "./live/live.component";

const routes: Routes = [
  { path: '', component: MainComponent ,children: [
      {
        path: 'user', component: UserComponent
      },
      {
        path: 'stream', component: LiveComponent
      },
      {
        path: '', redirectTo: 'user', pathMatch: 'full'
      }
    ]}
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
