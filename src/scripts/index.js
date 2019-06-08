// import dependencies
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Store } from './store';
import mapboxgl from 'mapbox-gl';

// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
library.add(fas, far);
dom.watch();

const store = new Store({});
store.setStateItem('daveism', '{test:true}');

mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2ZWlzbSIsImEiOiJCdjUxT0FzIn0.V9oIk_wUc4uZu7UBblR8mw';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-82.35, 35.60], // starting position [lng, lat]
  zoom: 9 // starting zoom
});
