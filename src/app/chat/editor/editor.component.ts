import {Component, Inject, OnInit} from '@angular/core';

import 'brace';
import 'brace/theme/github';
import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/sh';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/php';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  public value:string = 'console.log("azez")';
  public message: string = '';
  public mode:string = 'text';
  public sendCode:(code:string, language:string,message: string)=>void;
  public languages : {[index:string]:string} = {
    javascript: 'js',
    text: 'txt',
    html: 'html',
    sh: 'sh',
    java: 'java',
    python: 'py',
    php: 'php'
  };


  constructor(public dialogRef: MatDialogRef<EditorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  sendAndClose(){
    this.data.sendCode(this.value,this.languages[this.mode],this.message);
    this.dialogRef.close();
  }

}
