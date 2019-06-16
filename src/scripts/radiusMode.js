// https://gist.github.com/chriswhong/694779bc1f1e5d926e47bab7205fa559
// custom mapbopx-gl-draw mode that modifies draw_line_string
// shows a center point, radius line, and circle polygon while drawing
// forces draw.create on creation of second vertex
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import numeral from 'numeral';
import lineDistance from '@turf/line-distance';
import { GoogleAnalytics } from './ga';
import { Store } from './store';

const store = new Store({});
const RadiusMode = MapboxDraw.modes.draw_line_string;
const googleAnalytics = new GoogleAnalytics();

store.setStateItem('isTouchMove', true);

function createVertex(parentId, coordinates, path, selected) {
  return {
    type: 'Feature',
    properties: {
      meta: 'vertex',
      parent: parentId,
      coord_path: path,
      active: (selected) ? 'true' : 'false'
    },
    geometry: {
      type: 'Point',
      coordinates
    }
  };
}

// create a circle-like polygon given a center point and radius
// https://stackoverflow.com/questions/37599561/drawing-a-circle-with-the-radius-in-miles-meters-with-mapbox-gl-js/39006388#39006388
function createGeoJSONCircle(center, radiusInKm, parentId, points = 64) {
  const coords = {
    latitude: center[1],
    longitude: center[0]
  };

  const km = radiusInKm;

  const ret = [];
  const distanceX = km / (111.320 * Math.cos((coords.latitude * Math.PI) / 180));
  const distanceY = km / 110.574;

  let theta;
  let x;
  let y;
  for (let i = 0; i < points; i += 1) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [ret]
    },
    properties: {
      parent: parentId,
      active: 'true'
    }
  };
}

function getDisplayMeasurements(feature) {
  // should log both metric and standard display strings for the current drawn feature
  // metric calculation
  const drawnLength = (lineDistance(feature) * 1000); // meters

  let metricUnits = 'm';
  let metricFormat = '0,0';
  let metricMeasurement;

  let standardUnits = 'feet';
  let standardFormat = '0,0';
  let standardMeasurement;

  metricMeasurement = drawnLength;
  if (drawnLength >= 1000) { // if over 1000 meters, upgrade metric
    metricMeasurement = drawnLength / 1000;
    metricUnits = 'km';
    metricFormat = '0.00';
  }

  standardMeasurement = drawnLength * 3.28084;
  if (standardMeasurement >= 5280) { // if over 5280 feet, upgrade standard
    standardMeasurement /= 5280;
    standardUnits = 'mi';
    standardFormat = '0.00';
  }

  const displayMeasurements = {
    metric: `${numeral(metricMeasurement).format(metricFormat)} ${metricUnits}`,
    standard: `${numeral(standardMeasurement).format(standardFormat)} ${standardUnits}`
  };

  return displayMeasurements;
}

const doubleClickZoom = {
  enable: (ctx) => {
    setTimeout(() => {
      // First check we've got a map and some context.
      if (!ctx.map || !ctx.map.doubleClickZoom || !ctx._ctx ||
         !ctx._ctx.store || !ctx._ctx.store.getInitialConfigValue) return;
      // Now check initial state wasn't false (we leave it disabled if so)
      if (!ctx._ctx.store.getInitialConfigValue('doubleClickZoom')) return;
      ctx.map.doubleClickZoom.enable();
    }, 0);
  }
};


// Whenever a user clicks on a key while focused on the map, it will be sent here
RadiusMode.onKeyUp = function onKeyUp(state, e) {
  if (e.keyCode === 27) {
    this.deleteFeature([state.line.id], { silent: true });
    this.changeMode('simple_select', {}, { silent: true });
  }
};

function interactiveDraw(state, e, userSource, self) {
  // console.log( 'interactiveDraw',userSource)

  // this ends the drawing after the user creates a second point, triggering this.onStop
  if (state.currentVertexPosition === 1) {
    let coordnum = 0;
    // for reasons I am to lazy to figure out when a toch event is fired
    // you need an extra click or simulate an extra click to finish the circle.
    if (userSource === 'tap') {
      coordnum = 2;
    }

    // make sure touch drag draws cricle too
    if (userSource === 'touchMove' || userSource === 'tapstart') {
      state.line.removeCoordinate('2');
      state.line.addCoordinate(2, e.lngLat.lng, e.lngLat.lat);
      return null;
    }
    state.line.addCoordinate(coordnum, e.lngLat.lng, e.lngLat.lat);
    return self.changeMode('simple_select', { featureIds: [state.line.id] });
  }

  self.updateUIClasses({ mouse: 'add' });

  state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  if (state.direction === 'forward') {
    state.currentVertexPosition += 1; // eslint-disable-line
    state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  } else {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
  }

  return null;
}

RadiusMode.onTouchStart = function onTouchStart(state, e) {
  console.log('onTouchStart')
  e.preventDefault();
  if (state.didTouchStart) {
    state.didTouchStart = true; // eslint-disable-line
    return interactiveDraw(state, e, 'tapstart', this);
  }
  return null;
};

RadiusMode.onTap = function onTap(state, e) {
  console.log('onTap')
  if (!state.didTouchStart) {
    return interactiveDraw(state, e, 'tap', this);
  }
  return null;
};

RadiusMode.onTouchMove = function onTouchMove(state, e) {
  console.log('onTouchMove')
  const d = new Date();
  const n = d.getTime()
  const lastTouchMove = state.lastTouchMove;
  const differenceTravel = n  - lastTouchMove;
  const seconds = Math.floor((differenceTravel) ); // / (1000)
  // console.log('seconds', seco nds);
  state.lastTouchMove = n;

  // console.log(n)

  e.preventDefault();
  if (seconds > 50){
    return interactiveDraw(state, e, 'touchMove', this);
  }
};

RadiusMode.onTouchEnd = function onTouchEnd(state, e) {
  console.log('onTouchEnd')
  e.preventDefault();
  return interactiveDraw(state, e, 'onTouchEnd', this);
};

RadiusMode.clickAnywhere = function clickAnywhere(state, e, userType) {
  return interactiveDraw(state, e, 'mouse', this);
};

// creates the final geojson point feature with a radius property
// triggers draw.create
RadiusMode.onStop = function onStop(state) {
  doubleClickZoom.enable(this);
  console.log('onStop')
  this.activateUIButton();

  // check to see if we've deleted this feature
  if (this.getFeature(state.line.id) === undefined) return;

  // remove last added coordinate
  state.line.removeCoordinate('0');
  if (state.line.isValid()) {
    const lineGeoJson = state.line.toGeoJSON();
    const startPoint = lineGeoJson.geometry.coordinates[0];
    const distance = lineDistance(lineGeoJson);

    const circleGeoJSON = createGeoJSONCircle(startPoint, distance, null, 32);

    // ga event action, category, label
    googleAnalytics.setEvent('data', 'circle', JSON.stringify(circleGeoJSON));
    // console.log(JSON.stringify(circleGeoJSON))
    const feet = (distance * 1000) * 3.28084;
    googleAnalytics.setEvent('data', 'distance', feet);

    // reconfigure the geojson line into a geojson point with a radius property
    const pointWithRadius = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: circleGeoJSON.geometry.coordinates
      },
      properties: {
        radiusMetric: (lineDistance(lineGeoJson)).toFixed(1),
        radiusFeet: feet
      }
    };

    if (this.map.getLayer('circle-line')) {
      this.map.removeLayer('circle-line');
    }

    if (this.map.getLayer('circle-fill')) {
      this.map.removeLayer('circle-fill');
    }
    if (this.map.getSource('circle')) {
      this.map.removeSource('circle');
    }

    this.map.addSource('circle', {
      type: 'geojson',
      data: pointWithRadius
    });

    this.map.addLayer({
      id: 'circle-fill',
      type: 'fill',
      source: 'circle',
      paint: {
        'fill-color': '#D20C0C',
        'fill-outline-color': '#D20C0C',
        'fill-opacity': 0.1
      }
    });

    this.map.addLayer({
      id: 'circle-line',
      type: 'line',
      source: 'circle',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#D96B27',
        'line-dasharray': [0.2, 2],
        'line-width': 4
      }
    });

    this.map.fire('draw.create', {
      features: [pointWithRadius]
    });
    // store.setStateItem('studycompleted', true);
    // document.getElementById('study-complete').classList.remove('d-none');
    // document.getElementById('study-progress').remove();
  } else {
    this.deleteFeature([state.line.id], { silent: true });
    this.changeMode('simple_select', {}, { silent: true });
  }
};

RadiusMode.toDisplayFeatures = function toDisplayFeatures(state, geojson, display) {
  const isActiveLine = geojson.properties.id === state.line.id;

  geojson.properties.active = (isActiveLine) ? 'true' : 'false';  // eslint-disable-line
  if (!isActiveLine) return display(geojson);

  // Only render the line if it has at least one real coordinate
  if (geojson.geometry.coordinates.length < 2) return null;
  geojson.properties.meta = 'feature'; // eslint-disable-line

  // displays center vertex as a point feature
  display(createVertex(
    state.line.id,
    geojson.geometry.coordinates[state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1],
    `${state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1}`,
    false,
  ));

  // displays the line as it is drawn
  display(geojson);

  const displayMeasurements = getDisplayMeasurements(geojson);

  // create custom feature for the current pointer position
  const currentVertex = {
    type: 'Feature',
    properties: {
      meta: 'currentPosition',
      active: 'true',
      radiusMetric: displayMeasurements.metric,
      radiusStandard: displayMeasurements.standard,
      parent: state.line.id
    },
    geometry: {
      type: 'Point',
      coordinates: geojson.geometry.coordinates[1]
    }
  };
  display(currentVertex);

  // create custom feature for radius circlemarker
  const center = geojson.geometry.coordinates[0];
  const radiusInKm = lineDistance(geojson, 'kilometers');
  const circleFeature = createGeoJSONCircle(center, radiusInKm, state.line.id);
  circleFeature.properties.meta = 'radius';

  display(circleFeature);
  return null;
};

export default RadiusMode;
