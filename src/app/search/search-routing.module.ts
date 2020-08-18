import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from './search/search.component';
import {LiveComponent} from './live/live.component';
import {ReplayComponent} from './replay/replay.component';
import {BrowseComponent} from './browse/browse.component';

const routes: Routes = [
  { path: '', component: SearchComponent},
  { path: 'lives', component: LiveComponent},
  { path: 'replays', component: ReplayComponent},
  { path: 'browse', component: BrowseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
