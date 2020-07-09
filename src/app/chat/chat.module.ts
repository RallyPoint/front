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
    AceModule
  ],
  providers: [
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    }
  ]
})
export class ChatModule { }
