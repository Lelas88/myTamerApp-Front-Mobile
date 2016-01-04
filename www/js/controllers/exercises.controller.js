/**
 * Created by rober on 26.12.2015.
 */

angular.module('exercises.controller', ['exercises.services'])
  .controller('ExercisesCtrl', function ($scope, $http, $stateParams, $state, $ionicPopup, User, Exercises) {

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.shouldShowDelete = false;
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
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete?',
        template: 'Are you sure you want to delete exercise ' + exercise.name + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          Exercises.deleteExercise().delete({exerciseId: exercise.id});
          $scope.exercises.splice($scope.exercises.indexOf(exercise), 1);
          $scope.shouldShowDelete = false;
        } else {
          exercise.checked = false;
        }
      });
    };

    $scope.addExercise = function () {
      $state.transitionTo('app.addexercise');
    }
  })

  .controller('ExerciseCtrl', function ($scope, $http, $stateParams, $state, $ionicPopup, Exercises) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.shouldShowUnassign = false;
      $scope.exercise = Exercises.getExerciseDetails().get({exerciseId: $stateParams.exerciseId});
      $scope.description = $scope.exercise.description;
    });

    $scope.addResult = function () {
      $state.transitionTo('app.studentresult', {exerciseId: $stateParams.exerciseId})
    };

    $scope.editExercise = function () {
      $state.transitionTo('app.editexercise', {exerciseId: $stateParams.exerciseId})
    };

    $scope.unassignStudent = function (student) {
      confirmUnassignment(student);
    };

    function confirmUnassignment(student) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Unassign?',
        template: 'Are you sure you want to unassign student ' + student.firstName + ' ' + student.lastName + ' from exercise ' + $scope.exercise.name + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          $scope.shouldShowUnassign = false;
          Exercises.unassignStudent().delete({exerciseId: $scope.exercise.id, studentId: student.id});
        } else {
          student.checked = false;
        }
      });
    }
  })

  .controller('AddExerciseCtrl', function ($scope, $http, $stateParams, $state, Exercises, User) {
    var assignment = [];

    $scope.exerciseToSave = {
      "disciplineId": null,
      "name": null,
      "description": null,
      "unitId": null,
      "secondUnitId": null,
      "trainerId": null
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.units = Exercises.getUnits().query(function (data) {
        $scope.selectedUnit = data[0];
        $scope.selectedSecondUnit = data;
      });
      $scope.disciplines = Exercises.getDisciplines().query(function (data) {
        $scope.selectedDiscipline = data[0];
      });
      $scope.students = Exercises.getAllStudents().query({exerciseId: $stateParams.exerciseId});
      getUserId();
    });

    $scope.saveExercise = function () {
      $scope.exerciseToSave.disciplineId = $scope.selectedDiscipline.id;
      $scope.exerciseToSave.unitId = $scope.selectedUnit.id;

      Exercises.saveExercise().save($scope.exerciseToSave, function (newExercise) {
        var newExerciseId = parseInt(newExercise.entity);
        Exercises.assignStudents().save({exerciseId: newExerciseId}, assignment);
        $state.transitionTo('app.exercise', {exerciseId: newExerciseId});
      });

    };

    $scope.updateSelection = function (item) {
      $scope.exerciseToSave.secondUnitId = item.id;
    };

    $scope.addToAssignmentList = function (student) {
      if (student.checked) {
        assignment.push(student.id);
      } else {
        var index = assignment.indexOf(student.id);
        assignment.splice(index, 1);
      }
    };

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          $scope.exerciseToSave.trainerId = data;
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }
  })

  .controller('EditExerciseCtrl', function ($scope, $http, $stateParams, $state, $ionicPopup, Exercises) {
    var assignment = [];

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.units = Exercises.getUnits().query(function (data) {
        $scope.selectedUnit = data[0];
        $scope.selectedSecondUnit = data;
      });
      $scope.disciplines = Exercises.getDisciplines().query(function (data) {
        $scope.selectedDiscipline = data[0];
      });
      $scope.students = Exercises.getNotAssignedStudents().query({exerciseId: $stateParams.exerciseId});

      $scope.exerciseToSave = Exercises.getExerciseDetails().get({exerciseId: $stateParams.exerciseId});
    });

    $scope.saveExercise = function () {
      confirmEditing();
    };

    function confirmEditing() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Modify?',
        template: 'Are you sure you want to modify this exercise?'
      });

      confirmPopup.then(function (res) {
        $scope.exerciseToSave.disciplineId = $scope.selectedDiscipline.id;
        $scope.exerciseToSave.unitId = $scope.selectedUnit.id;
        if (res) {

          Exercises.editExercise().update($scope.exerciseToSave, function () {
            Exercises.assignStudents().save({exerciseId: $scope.exerciseToSave.id}, assignment);
            $state.transitionTo('app.exercise', {exerciseId: $scope.exerciseToSave.id});
          });
        }
      });
    }

    $scope.updateSelection = function (item) {
      $scope.exerciseToSave.secondUnitId = item.id;
    };

    $scope.addToAssignmentList = function (student) {
      if (student.checked) {
        assignment.push(student.id);
      } else {
        var index = assignment.indexOf(student.id);
        assignment.splice(index, 1);
      }
    };
  });
