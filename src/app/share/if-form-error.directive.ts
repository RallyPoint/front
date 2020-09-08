import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {FormControl} from "@angular/forms";

@Directive({
  selector: '[ifFormError]'
})
export class IfFormErrorDirective {

  private lastValue: boolean;
  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
  }

  @Input()
  set ifFormError(val: FormControl) {
    val.valueChanges.subscribe((a)=>{
      const status = val && val.invalid && val.touched;
      if(status === this.lastValue){return;}
      this.lastValue = val && val.invalid && val.touched;
      if(status) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
