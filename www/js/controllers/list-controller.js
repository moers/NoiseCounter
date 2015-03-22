angular.module('starter.controllers')

  .controller('ListCtrl', function($scope, noisePoints) {
    $scope.points = noisePoints;
  });
