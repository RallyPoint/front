import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { IfFormErrorDirective } from './if-form-error.directive';
import {ThumborPipe} from "./thumbor.pipe";
import {ApiService} from "./api.service";



@NgModule({
  declarations: [SafePipe, IfFormErrorDirective, ThumborPipe],
  imports: [
    CommonModule,
  ],
  providers: [ApiService],
  exports: [SafePipe, IfFormErrorDirective, ThumborPipe]
})
export class ShareModule { }
