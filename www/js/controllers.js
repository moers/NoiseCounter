angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWxtYXJidXJrZSIsImEiOiJmYlAzYl80In0.Odg6o8oVaZHGSjB5HY9G0A';
  // Create a map in the div #map
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json'
  });

  map.on('move', function(e) {
    console.log('move', e);
  });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
