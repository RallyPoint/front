import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { LiveComponent } from './live/live.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainComponent } from './main/main.component';
import {RouterModule} from "@angular/router";
import {UserRoutingModule} from "./account-routing.module";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [UserComponent, LiveComponent, SideBarComponent, MainComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class AccountModule { }

