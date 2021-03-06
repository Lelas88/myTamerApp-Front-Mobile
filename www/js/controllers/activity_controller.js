/**
 * Created by rober on 16.11.2015.
 */
angular.module('activity.controller', ['activity.services'])

  //Activities Controller
  .controller('ActivitiesCtrl', function($scope, Activity) {
    $scope.activities = Activity.query();
  })

  //Activity Controller
  .controller('ActivityCtrl', function($scope, $stateParams, Activity) {
    $scope.activity = Activity.get({activityId: $stateParams.activityId});
  });

