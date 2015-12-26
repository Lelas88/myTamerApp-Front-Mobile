/**
 * Created by rober on 26.12.2015.
 */

angular.module('mealsets.controller', ['mealsets.services'])
  .controller('MealSetsCtrl', function ($scope, $http, $stateParams, User, MealSet) {

    $scope.$on('$ionicView.beforeEnter', function () {
      shouldShowDelete: false
      getUserId();
    });

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            renderMealSetsList(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function renderMealSetsList(userId) {
      $scope.mealSets = MealSet.getMealSetsList().query({userId: userId});
    }

    $scope.onItemDelete = function (mealSet) {
      alert("Deleting meal set " + mealSet.name);
      $scope.mealSets.splice($scope.mealSets.indexOf(mealSet), 1);
    };
  })
  .controller('MealSetCtrl', function ($scope, $http, $stateParams, MealSet) {
    $scope.mealSet = MealSet.getMealSetDetails().get({mealSetId: $stateParams.mealSetId});
  });
