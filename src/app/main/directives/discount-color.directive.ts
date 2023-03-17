import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDiscountColor]'
})
export class DiscountColorDirective implements OnInit {

  @Input() appDiscountColor!: number;

  constructor(private elmRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    const discount: number = this.appDiscountColor
    let discountColor: string = '';
    if (discount >= 70) discountColor = 'red';
    if (discount < 70 && discount >= 60) discountColor = 'pink';
    if (discount < 60 && discount >= 50) discountColor = 'orange';
    if (discount < 50) discountColor = 'aliceblue';
    this.renderer.setStyle(this.elmRef.nativeElement, 'background-color', discountColor);
  }
}
