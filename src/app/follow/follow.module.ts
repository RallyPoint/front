import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowListComponent } from './follow-list/follow-list.component';
import {ShareModule} from "../share/share.module";
import {FollowService} from "./follow.service";



@NgModule({
  declarations: [FollowListComponent],
  exports: [
    FollowListComponent
  ],
  providers : [FollowService],
  imports: [
    CommonModule,
    ShareModule
  ]
})
export class FollowModule { }
