angular.module('starter.directives')

  .directive('glMap', function($timeout) {
    return {
      template: '<div id="map"></div>',
      scope: {
        center: '=',
        zoom: '=',
        markers: '='
      },
      link: function(scope) {
        var hasMarkerLayer = false;

        mapboxgl.accessToken = 'pk.eyJ1IjoiZWxtYXJidXJrZSIsImEiOiJmYlAzYl80In0.Odg6o8oVaZHGSjB5HY9G0A';
        // Create a map in the div #map
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json',
          center: scope.center,
          zoom: scope.zoom
        });
        level = [
          {
            'title': '',
            'marker-symbol': 'marker'
          }, {
          'title': 'Leise',
          'marker-symbol': 'circle-stroked'
          }, {
          'title': 'Aushaltbar',
          'marker-symbol': 'square-stroked'
          }, {
          'title': 'Laut',
          'marker-symbol': 'triangle-stroked'
          }
        ];

        scope.markers.$watch(function() {
          if (!angular.isArray(scope.markers)) {
            return;
          }

          if (hasMarkerLayer) {
            map.removeSource('markers');
          }
          hasMarkerLayer = true;

          var features = [];
          angular.forEach(scope.markers, function(vote) {
            features.push({
              'type': 'Feature',
              'geometry': {
                'type': 'MultiPoint',
                'coordinates': [
                  [
                    vote.point.lng,
                    vote.point.lat
                  ]
                ]
              },
              'properties': level[vote.level]
            });
          });

          map.addSource('markers', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': features
            }
          });
          map.addLayer({
            'id': 'markers',
            'type': 'symbol',
            'source': 'markers',
            'layout': {
              'icon-image': '{marker-symbol}-12',
              'text-field': '{title}',
              'text-font': 'Open Sans Semibold, Arial Unicode MS Bold',
              'text-offset': [0, 0.6],
              'text-anchor': 'top'
            },
            'paint': {
              'text-size': 12
            }
          });
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
