import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import {FormsModule} from "@angular/forms";
import { EditorComponent } from './editor/editor.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ACE_CONFIG, AceConfigInterface, AceModule} from "ngx-ace-wrapper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgScrollbarModule} from "ngx-scrollbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";


const DEFAULT_ACE_CONFIG: AceConfigInterface = {
};

@NgModule({
  declarations: [ChatComponent, EditorComponent],
  exports: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    AceModule,
    NgScrollbarModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule
  ],
  providers: [
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    }
  ]
})
export class ChatModule { }
