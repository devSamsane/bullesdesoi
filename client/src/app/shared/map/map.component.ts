import { Component } from '@angular/core';

@Component({
  selector: 'bds-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  lat = 48.933877;
  lng = 2.05179;
  zoom = 14;

  mapStyles = [
    {
      featureType: 'all',
      stylers: [{ hue: '#6200ea' }, { saturation: -40 }]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ hue: '#6200ea' }, { saturation: 50 }]
    },
    {
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ];

  url = '../../../assets/map/map_marker.png';
}
