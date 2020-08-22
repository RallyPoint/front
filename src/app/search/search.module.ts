import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import {SearchRoutingModule} from './search-routing.module';
import {LiveModule} from "../live/live.module";
import {MatButtonModule} from "@angular/material/button";
import { LiveComponent } from './live/live.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { ReplayComponent } from './replay/replay.component';
import { BrowseComponent } from './browse/browse.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {NgScrollbarModule} from "ngx-scrollbar";

@NgModule({
  declarations: [SearchComponent, LiveComponent, ReplayComponent, BrowseComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    LiveModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgScrollbarModule
  ]
})
export class SearchModule { }
