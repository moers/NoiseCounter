angular.module('starter.services')

  .factory('firebaseAuth', function(firebase, $firebaseAuth) {
    return $firebaseAuth(firebase);
  });
