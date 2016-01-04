/**
 * Created by rober on 26.12.2015.
 */

angular.module('exercisesets.controller', ['exercisesets.services'])
  .controller('ExerciseSetsCtrl', function ($scope, $http, $stateParams, $state, $ionicPopup, User, ExerciseSet) {

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.shouldShowDelete = false;
      getUserId();
    });

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            renderExerciseSetsList(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function renderExerciseSetsList(userId) {
      $scope.exerciseSets = ExerciseSet.getExerciseSetsList().query({userId: userId});
    }

    $scope.addExerciseSet = function () {
      $state.transitionTo('app.addexerciseset');
    };

    $scope.onItemDelete = function (exerciseSet) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete?',
        template: 'Are you sure you want to delete exercise set ' + exerciseSet.name + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          ExerciseSet.deleteExerciseSet().delete({exerciseSetId: exerciseSet.id});
          $scope.exerciseSets.splice($scope.exerciseSets.indexOf(exerciseSet), 1);
          $scope.shouldShowDelete = false;
        }
      });
    };
  })

  .controller('ExerciseSetCtrl', function ($scope, $http, $state, $stateParams, $ionicPopup, ExerciseSet) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.exerciseSet = ExerciseSet.getExerciseSetDetails().get({exerciseSetId: $stateParams.exerciseSetId});
    });

    $scope.convertMinutesToHours = function (exerciseLength) {
      var hours = Math.trunc(exerciseLength / 60);
      var minutes = exerciseLength % 60;
      if (hours > 0 && minutes > 0) {
        return hours + ' hours ' + minutes + ' minutes';
      } else if (hours > 0 && minutes <= 0) {
        return hours + ' hours';
      } else {
        return minutes + ' minutes';
      }
    };

    $scope.editExerciseSet = function() {
      $state.transitionTo('app.editexerciseset', {exerciseSetId: $stateParams.exerciseSetId});
    };

    $scope.unassignExercise = function (exercise) {
      confirmUnassignment(exercise);
    };

    function confirmUnassignment(exercise) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Unassign?',
        template: 'Are you sure you want to unassign exercise ' + exercise.name + ' from exercise ' + $scope.exerciseSet.name + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          $scope.shouldShowUnassign = false;
          ExerciseSet.unassignExercises().delete({exerciseSetId: $scope.exerciseSet.id, exerciseId: exercise.id});
        } else {
          exercise.checked = false;
        }
      });
    }
  })

  .controller('AddExerciseSetCtrl', function ($scope, $http, $stateParams, $state, ExerciseSet, Exercises, User) {
    var assignment = [];

    $scope.exerciseSetToSave = {
      "name": null,
      "exerciseLength": null,
      "userId": null
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      getUserId();
    });

    $scope.addToAssignmentList = function (exercise) {
      if (exercise.checked) {
        assignment.push(exercise.id);
      } else {
        var index = assignment.indexOf(exercise.id);
        assignment.splice(index, 1);
      }
    };

    $scope.saveExerciseSet = function () {
      $scope.exerciseSetToSave.userId = $scope.userId;
      ExerciseSet.saveExerciseSet().save($scope.exerciseSetToSave, function (newExerciseSet) {
        var newExerciseSetId = newExerciseSet.entity;
        ExerciseSet.assignExercises().save({exerciseSetId: newExerciseSetId}, assignment);
        $state.transitionTo('app.exerciseset', {exerciseSetId: newExerciseSetId});
      });
    };

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          $scope.exercises = Exercises.getExerciseList().query({userId: $scope.userId});
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }
  })

  .controller('EditExerciseSetCtrl', function ($scope, $http, $stateParams, $ionicPopup, $state, ExerciseSet, Exercises) {
    var assignment = [];

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.exerciseSetToSave = ExerciseSet.getExerciseSetDetails().get({exerciseSetId: $stateParams.exerciseSetId});
      $scope.exercises = ExerciseSet.getExercisesNotAssignedToExerciseSet().query({exerciseSetId: $stateParams.exerciseSetId});
    });

    $scope.addToAssignmentList = function (exercise) {
      if (exercise.checked) {
        assignment.push(exercise.id);
      } else {
        var index = assignment.indexOf(exercise.id);
        assignment.splice(index, 1);
      }
    };

    $scope.saveExerciseSet = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Modify?',
        template: 'Are you sure you want to modify this exercise set?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          ExerciseSet.updateExerciseSet().update($scope.exerciseSetToSave, function() {
            ExerciseSet.assignExercises().save({exerciseSetId: $scope.exerciseSetToSave.id}, assignment);
            $state.transitionTo('app.exerciseset', {exerciseSetId: $scope.exerciseSetToSave.id});
          });
        }
      });
    };
  });
