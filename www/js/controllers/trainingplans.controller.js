/**
 * Created by rober on 26.12.2015.
 */

angular.module('trainingplans.controller', ['trainingplans.services'])
  .controller('TrainingPlansCtrl', function ($scope, $http, $stateParams, User, TrainingPlan) {

    $scope.$on('$ionicView.beforeEnter', function () {
      shouldShowDelete: false
      getUserId();
    });

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            renderTrainingPlanList(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function renderTrainingPlanList(userId) {
      $scope.trainingPlans = TrainingPlan.getTrainingPlanList().query({userId: userId});
    }

    $scope.onItemDelete = function (trainingPlan) {
      alert("Deleting training plan " + trainingPlan.name);
      $scope.trainingPlans.splice($scope.trainingPlans.indexOf(trainingPlan), 1);
    };
  })
  .controller('TrainingPlanCtrl', function ($scope, $http, $stateParams, TrainingPlan) {
    $scope.trainingPlan = TrainingPlan.getTrainingPlanDetails().get({trainingPlanId: $stateParams.trainingPlanId});
  });
