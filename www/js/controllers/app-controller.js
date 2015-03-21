angular.module('starter.controllers')

  .controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebaseAuth) {
    // Form data for the login modal
    $scope.loginData = {};
    var ref = new Firebase('https://flickering-fire-3819.firebaseio.com');
    $scope.auth = $firebaseAuth(ref);

    // Initially set no user to be logged in
    $scope.user = null;

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.openLogin = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      $scope.auth.$authWithPassword($scope.loginData)
        .then(function(authData) {
          $scope.closeLogin();
        }, function(e) {
            console.error(e);
          });
    };

    $scope.logout = function() {
      $scope.auth.$unauth();
    };

    $scope.auth.$onAuth(function(authData) {
      $scope.user = authData;
    });

  });
