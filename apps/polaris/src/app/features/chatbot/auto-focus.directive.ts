
import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[autoFocus]'
})
export class AutoFocusDirective {

  @Input()
  public set autoFocus(value) {
    if (!!value) {
      this.host.nativeElement.focus();
    }
  }

  public constructor(
    private host: ElementRef,
  ) {
  }
}