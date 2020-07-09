import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { IfFormErrorDirective } from './if-form-error.directive';



@NgModule({
  declarations: [SafePipe, IfFormErrorDirective],
  imports: [
    CommonModule
  ],
  exports: [SafePipe,IfFormErrorDirective]
})
export class ShareModule { }
