import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShareModule} from '../share/share.module';
import {FollowService} from './follow.service';



@NgModule({
  declarations: [],
  exports: [

  ],
  providers : [FollowService],
  imports: [
    CommonModule,
    ShareModule
  ]
})
export class FollowModule { }
