import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Bike } from '../../interfaces/bike';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent {

  @Input() prod!: { data: Bike, color: string, size: string };

  constructor(public activeModal: NgbActiveModal, private location: Location) { }

  closeMessage() {
    this.activeModal.close('Close click');
    this.location.back();
  }
}
