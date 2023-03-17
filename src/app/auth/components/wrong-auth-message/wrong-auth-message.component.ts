import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wrong-auth-message',
  templateUrl: './wrong-auth-message.component.html',
  styleUrls: ['./wrong-auth-message.component.scss']
})
export class WrongAuthMessageComponent {

  @Input() message!: string;

  constructor(public activeModal: NgbActiveModal) { }

}
