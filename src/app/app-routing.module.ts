import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {HomeLivesResolver, HomeMainLiveResolver, HomeReplaysResolver} from './layout/home/home.resolver';
import {DefaultComponent} from './default.component';
import {NotFoundComponent} from './not-found.component';


const routes: Routes = [
  { path: '', component: DefaultComponent, children : [
      { path: '', component: HomeComponent, resolve : {
          lives : HomeLivesResolver,
          replays: HomeReplaysResolver,
          mainLive: HomeMainLiveResolver,
        }
      },
      { path: '', loadChildren: () => import('./channel/channel.module').then(m => m.ChannelModule) },
      { path: 'cms', loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule) },
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
      { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
      { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) }
    ]},
  { path: 'full', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
