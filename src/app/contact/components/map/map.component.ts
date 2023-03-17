import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  center: google.maps.LatLngLiteral = { lat: 50.44767419473275, lng: 30.522057884550087 };
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [{ lat: 50.44767419473275, lng: 30.522057884550087 }];

}

