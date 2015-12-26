/**
 * Created by rober on 26.12.2015.
 */

angular.module('meals.controller', ['meals.services'])
  .controller('MealsCtrl', function ($scope, $http, $stateParams, User, Meal) {

    $scope.$on('$ionicView.beforeEnter', function () {
      shouldShowDelete: false
      getUserId();
    });

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            console.log(data);
            renderMealList(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function renderMealList(userId) {
      $scope.meals = Meal.getMealList().query({userId: userId});
    }

    $scope.onItemDelete = function (meal) {
      alert("Deleting meal " + meal.name);
      $scope.meals.splice($scope.meals.indexOf(meal), 1);
    };
  })
  .controller('MealCtrl', function ($scope, $http, $stateParams, Meal) {
    $scope.meal = Meal.getMealDetails().get({mealId: $stateParams.mealId});
  });
