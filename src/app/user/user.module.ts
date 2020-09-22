import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { VerifyComponent } from './verify/verify.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [UserComponent, VerifyComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
