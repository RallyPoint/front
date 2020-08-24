import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq/faq.component';
import {CmsRoutingModule} from './cms-routing.module';
import { LegalComponent } from './legal/legal.component';
import {NgScrollbarModule} from "ngx-scrollbar";
import { DefaultComponent } from './default/default.component';

@NgModule({
  declarations: [FaqComponent, LegalComponent, DefaultComponent],
  imports: [
    CommonModule,
    CmsRoutingModule,
    NgScrollbarModule
  ]
})
export class CmsModule { }
