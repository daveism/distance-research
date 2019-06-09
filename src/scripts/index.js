// import dependencies
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Store } from './store';
import RadiusMode from './radius-mode';
import drawStyles from './drawstyles';

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
  center: [-98, 38.88], // starting position [lng, lat]
  // maxZoom: 14,
  zoom: 3, // starting zoom
  showZoom: true
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl,
  setZoom: 8,
  flyTo: false,
  placeholder: 'Search for locations...'
});

geocoder.on('result', (e) => {
  const x = e.result.center[0];
  const y = e.result.center[1];
  const offsetdist = 0.0025;
  const bbox = [[x - offsetdist, y - offsetdist], [x + offsetdist, y + offsetdist]];
  map.fitBounds(bbox, { maxZoom: 12 });
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

const drawControl = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    rectangle: false,
    polygon: false,
    trash: false
  },
  styles: drawStyles,
  modes: Object.assign({
    draw_radius: RadiusMode
  }, MapboxDraw.modes)
});

map.addControl(drawControl);

function handleDrawButtonClick(e) {
  drawControl.trash();

  if (map.getLayer('circle-line')) {
    map.removeLayer('circle-line');
  }

  if (map.getLayer('circle-fill')) {
    map.removeLayer('circle-fill');
  }
  if (map.getSource('circle')) {
    map.removeSource('circle');
  }

  drawControl.changeMode('draw_radius');
}
const drawCircleElement = document.querySelector('.btn-draw-circle');
drawCircleElement.addEventListener('click', handleDrawButtonClick);
