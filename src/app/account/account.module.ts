import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { LiveComponent } from './live/live.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainComponent } from './main/main.component';
import {RouterModule} from '@angular/router';
import {UserRoutingModule} from './account-routing.module';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule, NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {ShareModule} from '../share/share.module';
import {AuthModule} from '../auth/auth.module';
import { ReplaysComponent } from './replays/replays.component';
import {LiveModule} from '../live/live.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ReplayComponent } from './replay/replay.component';


@NgModule({
  declarations: [UserComponent, LiveComponent, SideBarComponent, MainComponent, ReplaysComponent, ReplayComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    ShareModule,
    AuthModule,
    MatIconModule,
    NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule, NgScrollbarModule, LiveModule, MatPaginatorModule
  ],
  providers : [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
    ]
})
export class AccountModule { }

