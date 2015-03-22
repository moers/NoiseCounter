angular.module('starter.services')

  .value('firebaseUrl', 'https://flickering-fire-3819.firebaseio.com')

  .factory('firebase', function(firebaseUrl) {
    var ref = new Firebase(firebaseUrl);

    return ref;
  });
