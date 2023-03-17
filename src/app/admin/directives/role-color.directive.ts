import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { Roles } from 'src/app/shared/enums/roles';

@Directive({
  selector: '[appRoleColor]'
})
export class RoleColorDirective {

  @Input() appRoleColor!: string;

  constructor(private elmRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    let roleColor: string = '';
    if (this.appRoleColor === Roles.Admin) roleColor = '#e3fedf';
    if (this.appRoleColor === Roles.Owner) roleColor = '#feebee';
    this.renderer.setStyle(this.elmRef.nativeElement, 'background-color', roleColor);
  }
}
