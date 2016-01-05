/**
 * Created by rober on 26.12.2015.
 */

angular.module('mealsets.controller', ['mealsets.services'])
  .controller('MealSetsCtrl', function ($scope, $http, $stateParams, $state, $ionicPopup, User, MealSet) {

    $scope.$on('$ionicView.beforeEnter', function () {
     $scope.shouldShowDelete = false;
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

    $scope.addMealSet = function() {
      $state.transitionTo('app.addmealset');
    };

    $scope.onItemDelete = function (mealSet) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete?',
        template: 'Are you sure you want to delete meal set' + mealSet.name + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          MealSet.deleteMealSet().delete({mealSetId: mealSet.id});
          $scope.mealSets.splice($scope.mealSets.indexOf(mealSet), 1);
          $scope.shouldShowDelete = false;
        }
      });
    };
  })


  .controller('MealSetCtrl', function ($scope, $http, $stateParams, $ionicPopup, $state, MealSet) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.mealSet = MealSet.getMealSetDetails().get({mealSetId: $stateParams.mealSetId});
    });

    $scope.editMealSet = function() {
      $state.transitionTo('app.editmealset', {mealSetId: $stateParams.mealSetId});
    };

    $scope.unassignMeal = function(meal) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Unassign?',
        template: 'Are you sure you want to unassign meal ' + meal.name + ' from meal set ' + $scope.mealSet.name + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          MealSet.unassignMeal().delete({mealId: meal.id, mealSetId: $stateParams.mealSetId});
        }
        $scope.shouldShowDelete = false;
      });
    }
  })

  .controller('AddMealSetCtrl', function ($scope, $http, $stateParams, $state, Meal, MealSet, User) {
    var assignment = [];

    $scope.mealSetToSave = {
      "name" : null,
      "userId" : null
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      getUserId();
    });

    $scope.addToAssignmentList = function (meal) {
      if (meal.checked) {
        assignment.push(meal.id);
      } else {
        var index = assignment.indexOf(meal.id);
        assignment.splice(index, 1);
      }
    };

    $scope.saveMealSet = function() {
      MealSet.saveMealSet().save($scope.mealSetToSave, function(newMealSet) {
        var newMealSetId = newMealSet.entity;
        MealSet.assignMeals().save({mealSetId: newMealSetId}, assignment);
        $state.transitionTo('app.mealset', {mealSetId: newMealSetId});
      })
    };

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            $scope.mealSetToSave.userId = data;
            $scope.meals = Meal.getMealList().query({userId: data});
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }
  })

  .controller('EditMealSetCtrl', function ($scope, $http, $state, $stateParams, MealSet, User) {
    var assignment = [];

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.mealSetToSave = MealSet.getMealSetDetails().get({mealSetId: $stateParams.mealSetId});
      getUserId();
    });

    $scope.addToAssignmentList = function (meal) {
      if (meal.checked) {
        assignment.push(meal.id);
      } else {
        var index = assignment.indexOf(meal.id);
        assignment.splice(index, 1);
      }
    };

    $scope.updateMealSet = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Modify?',
        template: 'Are you sure you want to modify this meal set?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          MealSet.updateMealSet().update($scope.mealSetToSave);
          MealSet.assignMeals().save({mealSetId: $scope.mealSetToSave.id}, assignment);
          $state.transitionTo('app.mealset', {mealSetId: $scope.mealSetToSave.id});
        }
      });
    };

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            $scope.meals = MealSet.getMealsNotAssigned().query({mealSetId: $stateParams.mealSetId, userId: data});
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }
  });
