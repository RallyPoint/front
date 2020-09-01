import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as CodeFlaskBugged from 'codeflask';
const CodeFlask: any = (CodeFlaskBugged as any).default;
import * as Prism from 'prismjs';
import 'prismjs/components/prism-ruby.min.js';
import 'prismjs/components/prism-yaml.min.js';
import 'prismjs/components/prism-sass.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-java.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-php.min.js';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {

  @ViewChild('codeEditor')
  public codeEditor: ElementRef;
  public value = 'console.log("azez")';
  public message = '';
  public mode = 'text';
  public sendCode: (code: string, language: string, message: string) => void;
  public languages: {[index: string]: string} = {
    js: 'js',
    ruby: 'rb',
    text: 'txt',
    html: 'html',
    yaml: 'yaml',
    sass: 'sass',
    bash: 'sh',
    java: 'java',
    python: 'py',
    php: 'php'
  };
  public isBrowser: boolean;
  private CodeFlaskInstance;

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
  languageChange(value){
    while (this.codeEditor.nativeElement.firstChild) {
      this.codeEditor.nativeElement.removeChild(this.codeEditor.nativeElement.lastChild);
    }
    this.codeEditor.nativeElement.innerHtml = '';
    this.initCodeFlask(this.mode);
  }
  ngAfterViewInit() {
    this.initCodeFlask(this.mode);
  }

  private initCodeFlask(mode: string){
  if (this.isBrowser) {
    console.log(mode);
    this.CodeFlaskInstance = new CodeFlask(this.codeEditor.nativeElement, {language: this.mode});
    console.log(Prism.languages,Prism.languages[this.mode]);
    this.CodeFlaskInstance.addLanguage(this.mode, Prism.languages[this.mode]);
    this.CodeFlaskInstance.updateCode(this.value);
    this.CodeFlaskInstance.onUpdate((code) => {
      this.value = code;
    });
  }
  }

}

