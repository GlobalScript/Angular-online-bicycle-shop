import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Bike } from 'src/app/main/interfaces/bike';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss']
})
export class PreviewCardComponent {
  @Input() prod!: { prod: Bike, route: boolean };
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  closeMessage() {
    if (this.prod.route) this.router.navigate(['/admin/products']);
    this.activeModal.dismiss('Cross click');

  }
}


