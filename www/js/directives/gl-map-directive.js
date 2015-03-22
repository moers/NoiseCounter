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
                level=[
                    {
                        "title": "",
                        "marker-symbol": "marker"
                    },{
                        "title": "Läuft...",
                        "marker-symbol": "circle-stroked"
                    },{
                        "title": "Geht...",
                        "marker-symbol": "square-stroked"
                    },{
                        "title": "LAUT",
                        "marker-symbol": "triangle-stroked"
                    }
                ];
                points= [
                    {
                        'level': 1,
                        'point': {
                            'lat': 51.44136533868161,
                            'lng': 6.66652310831409
                        },
                        "user":"Ich1",
                        "$id":'ick bin eene unique id1',
                        "$priority":null

                    },
                    {
                        'level': 2,
                        'point': {
                            'lat': 51.45136533868161,
                            'lng': 6.65652310831409
                        },
                        "user":"Ich2",
                        "$id":'ick bin eene unique id2',
                        "$priority":null

                    },
                    {
                        'level': 3,
                        'point': {
                            'lat': 51.46136533868161,
                            'lng': 6.67652310831409
                        },
                        "user":"Ich3",
                        "$id":'ick bin eene unique id3',
                        "$priority":null

                    }
                ];

                map.on('moveend', function () {
                    var center = map.getCenter();
                    scope.center.lat = center.lat;
                    scope.center.lng = center.lng;

                    scope.zoom = map.getZoom();
                    scope.$apply();
                });
                map.on('style.load', function () {
                    features = [];
                    points.forEach(function(vote) {
                        features.push(
                            {
                                "type": "Feature",
                                "geometry": {
                                    "type": "MultiPoint",
                                    "coordinates": [
                                        [
                                            vote.point.lng,
                                            vote.point.lat
                                        ]
                                    ]
                                },
                                "properties": level[vote.level]
                            }
                        );
                    });
                    map.addSource("markers", {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": features
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
