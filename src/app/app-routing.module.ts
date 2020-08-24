import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './layout/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cms', loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
