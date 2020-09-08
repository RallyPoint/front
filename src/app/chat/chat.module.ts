import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {EditorComponent} from './editor/editor.component';



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
    NgScrollbarModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule
  ],
  providers: [
  ]
})
export class ChatModule { }
