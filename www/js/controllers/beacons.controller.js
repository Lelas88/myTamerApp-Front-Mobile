/**
 * Created by rober on 23.11.2015.
 */

angular.module('beacons.controller', ['beacons.services', 'ngCordovaBeacon'])

  .controller("BeaconsCtrl", function($scope, $state, $rootScope, $ionicPlatform, $cordovaBeacon, Beacon, User) {

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.bluetoothActive = false;
      $scope.searchingBeacons = false;
    });

    $scope.exercises = [];
    var exerciseIds = [];
    var assignment = [];

    $scope.beaconData = {
      "uuid" : null,
      "minor" : null,
      "major" : null
    };

    $scope.beacons = {};

    $ionicPlatform.ready(function() {

      $cordovaBeacon.requestWhenInUseAuthorization();

      $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
        var uniqueBeaconKey;
        for(var i = 0; i < pluginResult.beacons.length; i++) {
          uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
          $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];

          $scope.beaconData.uuid = pluginResult.beacons[i].uuid;
          $scope.beaconData.minor = pluginResult.beacons[i].minor;
          $scope.beaconData.major = pluginResult.beacons[i].major;
          Beacon.matchBeaconExercises().query($scope.beaconData, function(data) {
            data.forEach(function(item) {
              if(exerciseIds.indexOf(item.id) === -1) {
                exerciseIds.push(item.id);
                $scope.exercises.push(item);
              }
            });
          });
        }
        $scope.$apply();
      });

      $scope.addToAssignmentList = function(exercise) {
        if (exercise.checked) {
          assignment.push(exercise.id);
        } else {
          var index = assignment.indexOf(exercise.id);
          assignment.splice(index, 1);
        }
      };

      $scope.saveExercises = function () {
        getUserId();
      };

      function getUserId() {
        User.getUserId()
          .success(function (data) {
            $scope.userId = data;
            if (data != null) {
              Beacon.downloadExercises().save({userId: data}, assignment);
              $scope.exercises.forEach(function(element) {
                element.checked = false;
              });
            }
          })
          .error(function (e) {
            $scope.status = 'Unable to load userId: ' + e.message;
          });
      }

      $scope.searchBeacons = function() {
        $scope.searchingBeacons = true;
        $scope.exercises = [];
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));
      };

      $scope.stopBeacons = function() {
        $scope.searchingBeacons = false;
        $cordovaBeacon.stopRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));
      };

      $scope.bluetoothSwitch = function() {
        if($scope.bluetoothActive) {
          $scope.bluetoothActive = false;
          alert('Bluetooth deactivated!');
        } else {
          $scope.bluetoothActive = true;
          alert('Bluetooth activated!');
        }
      };
    });
  });
