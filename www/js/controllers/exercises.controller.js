/**
 * Created by rober on 26.12.2015.
 */

angular.module('exercises.controller', ['exercises.services'])
  .controller('ExercisesCtrl', function ($scope, $http, $stateParams, User, Exercises) {

    $scope.$on('$ionicView.beforeEnter', function () {
      shouldShowDelete: false
      getUserId();
    });

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            renderExercisesList(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function renderExercisesList(userId) {
      $scope.exercises = Exercises.getExerciseList().query({userId: userId});
    }

    $scope.onItemDelete = function (exercise) {
      alert("Deleting exercise " + exercise.name);
      $scope.exercises.splice($scope.exercises.indexOf(exercise), 1);
    };
  })
  .controller('ExerciseCtrl', function ($scope, $http, $stateParams, Exercises) {
    $scope.exercise = Exercises.getExerciseDetails().get({exerciseId: $stateParams.exerciseId});
    $scope.description = $scope.exercise.description;
  });
