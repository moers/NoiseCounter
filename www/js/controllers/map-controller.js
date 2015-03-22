angular.module('starter.controllers')

  .controller('MapCtrl', function($scope, noisePoints) {
    $scope.noisePoints = noisePoints;

    $scope.map = {
      center: {
        lat: 51.45337, 
        lng: 6.62621
      },
      zoom: 12
    };
  });
