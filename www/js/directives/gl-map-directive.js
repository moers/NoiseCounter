angular.module('starter.directives')

    .directive('glMap', function () {
        return {
            template: '<div id="map"></div>',
            scope: {
                points: '=',
                center: '=',
                zoom: '='
            },
            link: function (scope) {
                mapboxgl.accessToken = 'pk.eyJ1IjoiZWxtYXJidXJrZSIsImEiOiJmYlAzYl80In0.Odg6o8oVaZHGSjB5HY9G0A';
                // Create a map in the div #map
                var map = new mapboxgl.Map({
                    container: 'map',
                    style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json',
                    center: scope.center,
                    zoom: scope.zoom
                });

                map.on('moveend', function () {
                    var center = map.getCenter();
                    scope.center.lat = center.lat;
                    scope.center.lng = center.lng;

                    scope.zoom = map.getZoom();
                    scope.$apply();
                });
                map.on('style.load', function () {
                    map.addSource("markers", {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": [{
                                "type": "Feature",
                                "geometry": {
                                    "type": "MultiPoint",
                                    "coordinates": [
                                        [
                                            6.66652310831409,
                                            51.44136533868161
                                        ]
                                    ]
                                },
                                "properties": {
                                    "title": "Läuft...",
                                    "marker-color": "#00ff00",
                                    "marker-symbol": "circle-stroked"
                                }
                            }, {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [
                                        6.668627159488535,
                                        51.446047256345975
                                    ]
                                },
                                "properties": {
                                    "title": "Geht so",
                                    "marker-color": "#FFff00",
                                    "marker-symbol": "square-stroked"
                                }
                            }, {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [
                                        6.668627159488535,
                                        51.456047256345975
                                    ]
                                },
                                "properties": {
                                    "title": "Ohrenschmerzen",
                                    "marker-color": "#FF0000",
                                    "marker-symbol": "triangle-stroked"
                                }
                            }]
                        }
                    });
                    map.addLayer({
                        "id": "markers",
                        "type": "symbol",
                        "source": "markers",
                        "layout": {
                            "icon-image": "{marker-symbol}-12",
                            "text-field": "{title}",
                            "text-font": "Open Sans Semibold, Arial Unicode MS Bold",
                            "text-offset": [0, 0.6],
                            "text-anchor": "top"
                        },
                        "paint": {
                            "text-size": 12
                        }
                    });
                });

            }
        };
    });
