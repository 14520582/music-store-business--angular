import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appScrollHeader]'
})
export class ScrollHeaderDirective {

  @HostBinding('style.background-color') color: string = "rgba(255,255,255,0.85)";
  @HostListener("window:scroll")
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 500) {
      this.color = "#fff";
    } else {
      this.color = "rgba(255,255,255,0.85)";
    }
  }
  constructor(
  ) { 
  }

}
