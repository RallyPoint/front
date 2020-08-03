import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FaqComponent} from './faq/faq.component';
import {LegalComponent} from './legal/legal.component';

const routes: Routes = [
  { path: 'faq', component: FaqComponent},
  { path: 'legal', component: LegalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
