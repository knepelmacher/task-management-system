import { Directive ,ElementRef,HostListener,Input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appAppoverhiligh]'
})
export class AppoverhilighDirective {

  constructor(
    private el:ElementRef,
   
  ) { }

@HostListener('mouseenter') onMouseEnter() {
    this.defaultColor = this.el.nativeElement.style.color;
    this.el.nativeElement.style.color = this.highlightColor;
    this.el.nativeElement.style.transition = 'background-color 0.3s ease';
  
  
  }

 @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.color = this.defaultColor;
   

  }

@Input('appHoverHighlight') highlightColor: string =  "rgb(245, 139, 41)";

  private defaultColor: string = '';
}
