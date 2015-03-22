angular.module('starter.controllers')

  .controller('FormCtrl', function($scope, geolocation, noisePoints, $state) {
    $scope.level = 2;

    $scope.save = function(level) {
      geolocation.getLocation()
        .then(function(data) {
          noisePoints.$add({
            level: level,
            point: {
              lat: data.coords.latitude,
              lng: data.coords.longitude
            }
          });

          $state.go('app.map');
        });
    };
  });
