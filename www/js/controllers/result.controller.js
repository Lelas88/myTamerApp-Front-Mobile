/**
 * Created by rober on 03.01.2016.
 */

angular.module('result.controller', ['result.services'])
  .controller('ResultCtrl', function ($scope, $stateParams, $state, Exercises) {

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.students = Exercises.assignStudents().query({exerciseId: $stateParams.exerciseId});
      $scope.exerciseId = $stateParams.exerciseId;
    });


  })
  .controller('AddResultCtrl', function ($scope, $stateParams, $state, Student, Exercises, Result) {

    var unit = {
      "name" : null,
      "id" : null
    };
    $scope.units = [];

    $scope.resultToSave = {
      "exerciseId" : null,
      "studentId" : null,
      "value" : null,
      "unitId" : null
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.resultToSave.value = null;
      $scope.student = Student.studentData().get({studentId: $stateParams.studentId}, function(data) {
        $scope.resultToSave.studentId = data.id;
      });
      $scope.exercise = Exercises.getExerciseDetails().get({exerciseId: $stateParams.exerciseId}, function(data) {
        renderUnits(data);
        $scope.resultToSave.exerciseId = data.id;
      });
      $scope.exerciseId = $stateParams.exerciseId;
    });

    $scope.saveResult = function() {
      $scope.resultToSave.unitId = $scope.selectedUnit.id;
      Result.saveResult().save($scope.resultToSave);
      $state.transitionTo('app.exercise', {exerciseId: $stateParams.exerciseId});
    };

    function renderUnits(data) {
      unit.id = data.unitId;
      unit.name = data.unitName;
      $scope.units.push(unit);
      $scope.selectedUnit = $scope.units[0];
      if(data.secondUnitId != null) {
        unit.id = data.secondUnitId;
        unit.name = data.secondUnitName;
        $scope.units.push(unit);
      }
    }
  });
