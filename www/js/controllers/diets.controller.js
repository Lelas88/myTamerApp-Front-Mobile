/**
 * Created by rober on 26.12.2015.
 */

angular.module('diets.controller', ['diets.services'])
  .controller('DietsCtrl', function ($scope, $http, $state, $ionicPopup, $stateParams, User, Diet) {

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.shouldShowDelete = false;
      getUserId();
    });

    $scope.addDiet = function() {
      $state.transitionTo('app.adddiet');
    };

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            renderDietList(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function renderDietList(userId) {
      $scope.diets = Diet.getDietsList().query({userId: userId});
    }

    $scope.onItemDelete = function (diet) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete?',
        template: 'Are you sure you want to delete diet ' + diet.name + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          Diet.deleteDiet().delete({dietId: diet.id});
          $scope.diets.splice($scope.diets.indexOf(diet), 1);
          $scope.shouldShowDelete = false;
        } else {
          diet.checked = false;
        }
      });
    };
  })


  .controller('DietCtrl', function ($scope, $http, $state, $ionicPopup, $stateParams, Diet) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.diet = Diet.getDietDetails().get({dietId: $stateParams.dietId});
    });

    $scope.editDiet = function() {
      $state.transitionTo('app.editdiet', {dietId: $stateParams.dietId});
    };

    $scope.unassignMealSet = function(mealSet) {
      confirmUnassignment('mealset', mealSet);
      $scope.showDeleteMealSet = false;
    };

    $scope.unassignTrainingPlan = function(trainingPlan) {
      confirmUnassignment('trainingplan', trainingPlan);
      $scope.showDeleteTrainingPlan = false;
    };

    function confirmUnassignment(type, entity) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Unassign?',
        template: 'Are you sure you want to unassign meal set ' + entity.name + ' from diet ' + $scope.diet.name + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          if(type === 'trainingplan') {
            Diet.unassignDietFromTrainingPlan().delete({trainingPlanId: entity.id, dietId: $stateParams.dietId});
          } else if(type == 'mealset') {
            Diet.unassignMealSetFromDiet().delete({mealSetId: entity.id, dietId: $stateParams.dietId});
          }
        }
      });
    }
  })


  .controller('AddDietCtrl', function ($scope, $http, $state, $stateParams, User, TrainingPlan, MealSet, Diet) {
    var trainingPlanAssignment = [];
    var mealSetAssignment = [];

    $scope.dietToSave = {
      "userId" : null,
      "name" : null,
      "description" : null
    };

    $scope.saveDiet = function() {
      Diet.saveDiet().save($scope.dietToSave, function(newDiet) {
        var newDietId = newDiet.entity;
        Diet.assignDietToTrainingPlans().save({dietId: newDietId}, trainingPlanAssignment);
        Diet.assignMealSetsToDiet().save({dietId: newDietId}, mealSetAssignment);
        $state.transitionTo('app.diet', {dietId: newDietId});
      });
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      getUserId();
    });

    $scope.addToAssignedTrainingPlans = function (trainingPlan) {
      if (trainingPlan.checked) {
        trainingPlanAssignment.push(trainingPlan.id);
      } else {
        var index = trainingPlanAssignment.indexOf(trainingPlan.id);
        trainingPlanAssignment.splice(index, 1);
      }
    };

    $scope.addToAssignedMealSets = function (mealSet) {
      if (mealSet.checked) {
        mealSetAssignment.push(mealSet.id);
      } else {
        var index = mealSetAssignment.indexOf(mealSet.id);
        mealSetAssignment.splice(index, 1);
      }
    };

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            $scope.dietToSave.userId = data;
            $scope.mealSets = MealSet.getMealSetsList().query({userId: data});
            $scope.trainingPlans = TrainingPlan.getTrainingPlanList().query({userId: data});
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }
  })
  .controller('EditDietCtrl', function ($scope, $http, $state, $stateParams, $ionicPopup, User, Diet) {
    var trainingPlanAssignment = [];
    var mealSetAssignment = [];

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.dietToSave = Diet.getDietDetails().get({dietId: $stateParams.dietId});
      getUserId();
    });

    $scope.addToAssignedTrainingPlans = function (trainingPlan) {
      if (trainingPlan.checked) {
        trainingPlanAssignment.push(trainingPlan.id);
      } else {
        var index = trainingPlanAssignment.indexOf(trainingPlan.id);
        trainingPlanAssignment.splice(index, 1);
      }
    };

    $scope.addToAssignedMealSets = function (mealSet) {
      if (mealSet.checked) {
        mealSetAssignment.push(mealSet.id);
      } else {
        var index = mealSetAssignment.indexOf(mealSet.id);
        mealSetAssignment.splice(index, 1);
      }
    };

    $scope.modifyDiet = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Modify?',
        template: 'Are you sure you want to modify this diet?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          Diet.updateDiet().update($scope.dietToSave);
          Diet.assignDietToTrainingPlans().save({dietId: $stateParams.dietId}, trainingPlanAssignment);
          Diet.assignMealSetsToDiet().save({dietId: $stateParams.dietId}, mealSetAssignment);
          $state.transitionTo('app.diet', {dietId: $stateParams.dietId});
        }
      });
    };

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            $scope.dietToSave.userId = data;
            $scope.mealSets = Diet.getNotAssignedMealSets().query({dietId: $stateParams.dietId, userId: data});
            $scope.trainingPlans = Diet.getNotAssignedTrainingPlans().query({dietId: $stateParams.dietId, userId: data});
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }
  });
