import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CmsRoutingModule} from './cms-routing.module';
import {NgScrollbarModule} from "ngx-scrollbar";
import { DefaultComponent } from './default/default.component';

@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    CmsRoutingModule,
    NgScrollbarModule
  ]
})
export class CmsModule { }
