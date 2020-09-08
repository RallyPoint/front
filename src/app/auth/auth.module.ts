import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {ShareModule} from '../share/share.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from './login.service';
import {AuthenticationService} from './authentication.service';
import {IsConnectedGuard} from './IsConnected.guard';



@NgModule({
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    ShareModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, LoginService, IsConnectedGuard]
})
export class AuthModule { }
