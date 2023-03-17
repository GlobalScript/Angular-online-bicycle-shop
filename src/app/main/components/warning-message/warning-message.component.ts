import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warning-message',
  templateUrl: './warning-message.component.html',
  styleUrls: ['./warning-message.component.scss']
})
export class WarningMessageComponent {

  @Input() name!: string;

  constructor(public activeModal: NgbActiveModal) { }
}
