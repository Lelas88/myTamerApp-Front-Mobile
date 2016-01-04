/**
 * Created by rober on 23.11.2015.
 */

//angular.module('beacons.controller', ['beacons.services', 'ngCordovaBeacon'])

  /*.controller("BeaconsCtrl", function($scope, $rootScope, $ionicPlatform, $cordovaBeacon) {

    $scope.beacons = {};

    $ionicPlatform.ready(function() {
      console.log("ready");
      $cordovaBeacon.requestWhenInUseAuthorization();

      console.log("request done");
      $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
        console.log("beacons in region");
        var uniqueBeaconKey;
        for(var i = 0; i < pluginResult.beacons.length; i++) {
          uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
          $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
          console.log(uniqueBeaconKey);
        }
        $scope.$apply();
      });

      $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));

    });
  });*/
