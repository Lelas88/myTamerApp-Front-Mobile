/**
 * Created by rober on 26.12.2015.
 */

angular.module('exercisesets.controller', ['exercisesets.services'])
  .controller('ExerciseSetsCtrl', function ($scope, $http, $stateParams, User, ExerciseSet) {

    $scope.$on('$ionicView.beforeEnter', function () {
      shouldShowDelete: false
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

    $scope.onItemDelete = function (exerciseSet) {
      alert("Deleting exercise set " + exerciseSet.name);
      $scope.exerciseSets.splice($scope.exerciseSets.indexOf(exerciseSet), 1);
    };
  })
  .controller('ExerciseSetCtrl', function ($scope, $http, $stateParams, ExerciseSet) {
    $scope.exerciseSet = ExerciseSet.getExerciseSetDetails().get({exerciseSetId: $stateParams.exerciseSetId});

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
    }
  });
