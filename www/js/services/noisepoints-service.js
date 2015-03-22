angular.module('starter.services')

  .factory('noisePoints', function(firebaseUrl, $firebaseArray) {
    var ref = new Firebase(firebaseUrl + '/points');

    return $firebaseArray(ref);
  });
