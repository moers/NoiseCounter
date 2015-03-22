angular.module('starter.controllers')

  .controller('AppCtrl', function($scope, $ionicModal, $timeout, firebaseAuth) {
    // Form data for the login modal
    $scope.loginData = {};

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
      firebaseAuth.$authWithPassword($scope.loginData)
        .then(function(authData) {
          $scope.closeLogin();
        }, function(e) {
            console.error(e);
          });
    };

    $scope.logout = function() {
      firebaseAuth.$unauth();
    };

    firebaseAuth.$onAuth(function(authData) {
      $scope.user = authData;
    });

  });
