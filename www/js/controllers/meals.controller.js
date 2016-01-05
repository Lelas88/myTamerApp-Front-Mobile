/**
 * Created by rober on 26.12.2015.
 */

angular.module('meals.controller', ['meals.services'])
  .controller('MealsCtrl', function ($scope, $http, $stateParams, $state, $ionicPopup, User, Meal) {

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.shouldShowDelete = false;
      getUserId();
    });

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
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
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete?',
        template: 'Are you sure you want to delete meal ' + meal.name + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          Meal.deleteMeal().delete({mealId: meal.id});
          $scope.meals.splice($scope.meals.indexOf(meal), 1);
          $scope.shouldShowDelete = false;
        }
      });
    };

    $scope.addMeal = function () {
      $state.transitionTo('app.addmeal');
    };
  })

  .controller('MealCtrl', function ($scope, $http, $state, $stateParams, Meal) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.meal = Meal.getMealDetails().get({mealId: $stateParams.mealId});
      $scope.nutritions = Meal.getMealNutritions().query({mealId: $stateParams.mealId});
    });

    $scope.editMeal = function () {
      $state.transitionTo('app.editmeal', {mealId: $stateParams.mealId});
    }
  })

  .controller('AddMealCtrl', function ($scope, $http, $stateParams, $state, $ionicPopup, User, Meal) {

    $scope.$on('$ionicView.beforeEnter', function () {
      getUserId();
      $scope.nutritions = Meal.getNutritions().query();
    });

    $scope.mealToSave = {
      "name": null,
      "userId": null,
      "description": null,
      "ingridients": null,
      "preparing": null,
      "iconName": null
    };

    $scope.saveMeal = function () {
      Meal.addMeal().save($scope.mealToSave, function (newMeal) {
        var newMealId = newMeal.entity;
        $scope.nutritions.forEach(function (item) {
          if (item.value != null) {
            Meal.saveNutritions().save({mealId: newMealId}, item);
          }
        });
        $state.transitionTo('app.meal', {mealId: newMealId});
      });
    };

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            $scope.mealToSave.userId = data;
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }
  })

  .controller('EditMealCtrl', function ($scope, $http, $stateParams, $ionicPopup, $state, Meal) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.mealToSave = Meal.getMealDetails().get({mealId: $stateParams.mealId});
      var mealNutritions = Meal.getMealNutritions().query({mealId: $stateParams.mealId});
      $scope.nutritions = Meal.getNutritions().query(function (data) {
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < mealNutritions.length; j++) {
            if (data[i].name === mealNutritions[j].name) {
              if (mealNutritions[j].value != null) {
                data[i].value = mealNutritions[j].value;
              }
            }
          }
        }
      });
    });

    $scope.modifyMeal = function (meal) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Modify?',
        template: 'Are you sure you want to modify this meal?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          Meal.updateMeal().update($scope.mealToSave);
          $scope.nutritions.forEach(function (item) {
            if (item.value != null) {
              Meal.saveNutritions().save({mealId: $scope.mealToSave.id}, item);
            }
          });
          $state.transitionTo('app.meal', {mealId: $scope.mealToSave.id});
        }
      });
    };
  });
