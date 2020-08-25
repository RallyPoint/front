import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';

import {isPlatformBrowser} from '@angular/common';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

if (!navigator){
  navigator = <any>{userAgent:'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'};
}
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/php/php';
import 'codemirror/mode/python/python';
import 'codemirror/mode/shell/shell';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  public value = 'console.log("azez")';
  public message = '';
  public mode = 'text';
  public sendCode: (code: string, language: string, message: string) => void;
  public languages: {[index: string]: string} = {
    javascript: 'js',
    text: 'txt',
    html: 'html',
    yaml: 'yaml',
    sass: 'sass',
    sh: 'sh',
    java: 'java',
    python: 'py',
    php: 'php'
  };
  public isBrowser: boolean;


  constructor(public dialogRef: MatDialogRef<EditorComponent>,
              @Inject(PLATFORM_ID) private platformId: any,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  sendAndClose(){
    this.data.sendCode(this.value, this.languages[this.mode], this.message);
    this.dialogRef.close();
  }

}
