// import dependencies
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Store } from './store';
import RadiusMode from './radiusMode';
import drawStyles from './drawstyles';
import { GoogleAnalytics } from './ga';

const store = new Store({});
const googleAnalytics = new GoogleAnalytics();

// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
library.add(fas, far);
dom.watch();

const urlString = window.location.href;
const url = new URL(urlString);
const userType = url.searchParams.get('userType');

// ga event action, category, label
googleAnalytics.setEvent('data', 'userType', userType);

mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2ZWlzbSIsImEiOiJCdjUxT0FzIn0.V9oIk_wUc4uZu7UBblR8mw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  // 'mapbox://styles/daveism/cjwrrdfd20uic1dnzsti2owlk', - dark
  center: [-98, 38.88], // starting position [lng, lat]
  zoom: 3, // starting zoom
  showZoom: true,
  touchEnabled: true,
  keybindings: true
});

// setup map
const drawControl = new MapboxDraw({
  displayControlsDefault: true,
  controls: {
    rectangle: true,
    polygon: true,
    linestring: true,
    trash: true,
    touchEnabled: true,
    keybindings: true
  },
  styles: drawStyles,
  modes: Object.assign({
    draw_radius: RadiusMode
  }, MapboxDraw.modes)
});

map.addControl(drawControl);

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl,
  setZoom: 8,
  flyTo: false,
  placeholder: 'Search for a location...'
});

map.on('zoomend', () => {
  // console.log(map.getZoom())
  if (map.getZoom() > 11.5) {
    const circleButtonElem = document.getElementById('circle-button');
    if (circleButtonElem.classList.contains('disabled')) {
      circleButtonElem.classList.remove('disabled');
      $('#circle-button').tooltip({ trigger: 'manual' });
      $('#circle-button').tooltip('hide');
      $('#circle-button').tooltip('disable');
      $('#circle-button').tooltip('dispose');
      document.getElementById('step2-title').classList.remove('disabled');
      document.getElementById('step2-directions').classList.remove('disabled');
    }
  }
});

// function
function handleAgreeClick() {
  document.getElementById('study-progress').classList.remove('d-none');
  document.getElementById('study-agreement-all').classList.add('d-none');
  document.getElementById('study-dissaggree').remove();
  store.setStateItem('study-agreement', true);
  return null;
}

function handleDissagreeClick() {
  document.getElementById('study-progress').classList.remove('d-none');
  document.getElementById('study-dissaggree').classList.remove('d-none');
  document.getElementById('study-agreement-all').classList.add('d-none');
  document.getElementById('study-progress').remove();
  store.setStateItem('study-agreement', false);
  return null;
}

// ensure the object or variable is valid...
// @param obj - typeless
function checkValidObject(obj) {
  if (obj === undefined || obj === null) { return false; }
  if (typeof obj === 'object' && Object.keys(obj).length === 0) { return false; }
  if (typeof obj === 'string' && obj.length === 0) { return false; }

  return true;
}

function uuid() {
  return crypto.getRandomValues(new Uint32Array(4)).join('-');
}

function handleDrawButtonClick(e) {
  const circleButtonElem = document.getElementById('circle-button');
  if (circleButtonElem) {
    if (circleButtonElem.classList.contains('disabled')) {
      $('#circle-button').tooltip({ trigger: 'hover focus' });
      $('#circle-button').tooltip('show');
      return null;
    } else { // eslint-disable-line
      $('#circle-button').tooltip({ trigger: 'manual' });
      $('#circle-button').tooltip('hide');
      $('#circle-button').tooltip('disable');
      $('#circle-button').tooltip('dispose');
    }
  }

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
  return null;
}

// check study session state for completetion
const isStudycompleted = store.getStateItem('studycompleted');
let studyCompleted = false;
if (typeof isStudycompleted === 'boolean') {
  studyCompleted = isStudycompleted;
} else {
  studyCompleted = false;
}

// check study session state for completetion
const StudyAgrreement = store.getStateItem('study-agreement');
let studyAgrreed = false;
if (typeof StudyAgrreement === 'boolean') {
  studyAgrreed = StudyAgrreement;
} else {
  studyAgrreed = false;
}

// already agreed
if (studyAgrreed) {
  // handleAgreeClick();
}

// hide study
if (studyCompleted) { // || studyAgrreed
  handleAgreeClick();
  document.getElementById('study-complete').classList.remove('d-none');
  document.getElementById('study-progress').remove();
  document.getElementById('map-holder').remove();
} else {
  // document.getElementById('study-progress').classList.remove('d-none');
  store.setStateItem('studycompleted', false);
}

if (!checkValidObject(store.getStateItem('uuid'))) {
  store.setStateItem('uuid', uuid());
}

geocoder.on('result', (e) => {
  const x = e.result.center[0];
  const y = e.result.center[1];

  // ga event action, category, label
  googleAnalytics.setEvent('data', 'searchpoint', `${x}, ${y}`);

  const offsetdist = 0.0025;
  const bbox = [[x - offsetdist, y - offsetdist], [x + offsetdist, y + offsetdist]];

  // create random zoom incase users are influenced by intial zoomlevel
  const min = 10;
  const max = 14;
  const zm = Math.floor(Math.random() * (max - min + 1) + min);
  map.fitBounds(bbox, { maxZoom: zm });

  // ga event action, category, label
  googleAnalytics.setEvent('data', 'searchzoom', zm);


  const circleButtonElem = document.getElementById('circle-button');
  if (circleButtonElem.classList.contains('disabled')) {
    circleButtonElem.classList.remove('disabled');
    $('#circle-button').tooltip({ trigger: 'manual' });
    $('#circle-button').tooltip('hide');
    $('#circle-button').tooltip('disable');
    $('#circle-button').tooltip('dispose');
    document.getElementById('step2-title').classList.remove('disabled');
    document.getElementById('step2-directions').classList.remove('disabled');
  }
});

const geocodeElem = document.getElementById('geocoder');
if (geocodeElem) {
  geocodeElem.appendChild(geocoder.onAdd(map));
}
const drawCircleElement = document.querySelector('.btn-draw-circle');
if (drawCircleElement) {
  drawCircleElement.addEventListener('click', handleDrawButtonClick);
}

const directionsOne = [
  'Search for a location you care about.',
  'Search for a location to find about crime.',
  'Search for a location to find about a pizza place.'
];

const minOne = 0;
const maxOne = 2;
const messageIndexOne = Math.floor(Math.random() * (maxOne - minOne + 1) + minOne);
const stepDirections1 = document.getElementById('step1-directions');
if (stepDirections1) {
  stepDirections1.innerHTML = directionsOne[messageIndexOne];
}

// ga event action, category, label
googleAnalytics.setEvent('data', 'step1text', directionsOne[messageIndexOne]);

const directionsTwo = [
  'Draw a circle that represents 1 mile from the location.',
  'Draw a circle that represents a 5 minute <strong>DRIVE</strong>.',
  'Draw a circle that represents a 5 minute <strong>WALK</strong>.'
];

const minTwo = 0;
const maxTwo = 2;
const messageIndexTwo = Math.floor(Math.random() * (maxTwo - minTwo + 1) + minTwo);
const stepDirections2 = document.getElementById('step2-directions');
if (stepDirections2) {
  stepDirections2.innerHTML = directionsTwo[messageIndexTwo];
}

// ga event action, category, label
googleAnalytics.setEvent('data', 'step2text', directionsTwo[messageIndexTwo]);

const aggreeButtonElement = document.getElementById('aggree-button');
if (aggreeButtonElement) {
  aggreeButtonElement.addEventListener('click', handleAgreeClick);
}

const dissaggreeButtonElement = document.getElementById('diaggree-button');
if (dissaggreeButtonElement) {
  dissaggreeButtonElement.addEventListener('click', handleDissagreeClick);
}
