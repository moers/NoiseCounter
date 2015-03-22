angular.module('starter.directives')

  .directive('glMap', function() {
    return {
      template: '<div id="map"></div>',
      scope: {
        center: '=',
        zoom: '='
      },
      link: function(scope) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZWxtYXJidXJrZSIsImEiOiJmYlAzYl80In0.Odg6o8oVaZHGSjB5HY9G0A';
        // Create a map in the div #map
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json',
          center: scope.center,
          zoom: scope.zoom
        });

        map.on('moveend', function() {
          var center = map.getCenter();
          scope.center.lat = center.lat;
          scope.center.lng = center.lng;

          scope.zoom = map.getZoom();
          scope.$apply();
        });
      }
    };
  });
