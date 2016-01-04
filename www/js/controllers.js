angular.module('starter.controllers', ['starter.services'])

  .controller('AppCtrl', function ($scope, $state, $timeout, $ionicModal, Auth) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    $scope.logout = function () {
      Auth.logout();
      $state.transitionTo('login');
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.loginMe = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      $timeout(function () {
        if (!angular.isDefined($scope.loginData.username) || !angular.isDefined($scope.loginData.password)
          || $scope.loginData.username.trim() == "" || $scope.loginData.password.trim() == "") {
          alert("Enter both user name and password");
        } else if($scope.loginData.username.trim() == 'test' && $scope.loginData.password.trim() == 'test') {
          Auth.setUser({
            username: $scope.loginData.username
          });
          $state.go("app.dashboard");
        } else {
          alert("Entered login or/and password was incorrect");
        }
      }, 1000);
    };
  });
