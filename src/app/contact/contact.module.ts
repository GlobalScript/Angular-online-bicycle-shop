import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ContactRoutingModule } from './contact-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    MapComponent,
    ContactPageComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    GoogleMapsModule,
  ]
})
export class ContactModule { }
