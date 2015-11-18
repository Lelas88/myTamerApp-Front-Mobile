/**
 * Created by rober on 16.11.2015.
 */
angular.module('dashboard.controller', ['dashboard.services'])

  //Dashboard Controller
  .controller('DashboardCtrl', function ($scope, Dashboard, Auth) {
    $scope.dashboard = Dashboard.query();
    $scope.sometext = Auth.username;
  });
