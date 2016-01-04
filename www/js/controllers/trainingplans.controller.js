/**
 * Created by rober on 26.12.2015.
 */

angular.module('trainingplans.controller', ['trainingplans.services'])
  .controller('TrainingPlansCtrl', function ($scope, $http, $state, $stateParams, User, TrainingPlan) {

    $scope.$on('$ionicView.beforeEnter', function () {
      getUserId();
    });

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            renderTrainingPlanList(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function renderTrainingPlanList(userId) {
      $scope.trainingPlans = TrainingPlan.getTrainingPlanList().query({userId: userId});
    }

    $scope.onItemDelete = function (trainingPlan) {
      alert("Deleting training plan " + trainingPlan.name);
      $scope.trainingPlans.splice($scope.trainingPlans.indexOf(trainingPlan), 1);
    };

    $scope.addTrainingPlan = function () {
      $state.transitionTo('app.addtrainingplan');
    }
  })

  .controller('TrainingPlanCtrl', function ($scope, $http, $stateParams, TrainingPlan) {
    $scope.trainingPlan = TrainingPlan.getTrainingPlanDetails().get({trainingPlanId: $stateParams.trainingPlanId});
  })

  .controller('AddTrainingPlanCtrl', function ($scope, $http, $stateParams, $state, TrainingPlan, Students, ExerciseSet, Diet, User) {
    var exerciseSetsAssignment = [];
    var studentsAssignment = [];
    var dietsAssignment = [];

    $scope.trainingPlanToSave = {
      "name": null,
      "description": null,
      "userId": null
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      getUserId();
    });

    $scope.addExerciseSetToAssignmentList = function (exerciseSet) {
      if (exerciseSet.checked) {
        exerciseSetsAssignment.push(exerciseSet.id);
      } else {
        var index = exerciseSetsAssignment.indexOf(exerciseSet.id);
        exerciseSetsAssignment.splice(index, 1);
      }
    };

    $scope.addStudentToAssignmentList = function (student) {
      if (student.checked) {
        studentsAssignment.push(student.id);
        console.log(studentsAssignment);
      } else {
        var index = studentsAssignment.indexOf(student.id);
        studentsAssignment.splice(index, 1);
      }
    };

    $scope.addDietToAssignmentList = function (diet) {
      if (diet.checked) {
        dietsAssignment.push(diet.id);
      } else {
        var index = dietsAssignment.indexOf(diet.id);
        dietsAssignment.splice(index, 1);
      }
    };

    $scope.saveTrainingPlan = function () {
      $scope.trainingPlanToSave.userId = $scope.userId;
      TrainingPlan.createTrainingPlan().save($scope.trainingPlanToSave, function (newTrainingPlan) {
        var newTrainingPlanId = newTrainingPlan.entity;
        TrainingPlan.assignExerciseSetsToTrainingPlan().save({trainingPlanId: newTrainingPlanId}, exerciseSetsAssignment);
        TrainingPlan.assignDietToTrainingPlan().save({trainingPlanId: newTrainingPlanId}, dietsAssignment);
        TrainingPlan.assignStudentsToTrainingPlan().save({trainingPlanId: newTrainingPlanId}, studentsAssignment);

        $state.transitionTo('app.trainingplan', {trainingPlanId: newTrainingPlanId});
      });
    };

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            $scope.students = Students.getUserStudents().query({userId: $scope.userId});
            $scope.exerciseSets = ExerciseSet.getExerciseSetsList().query({userId: $scope.userId});
            $scope.diets = Diet.getDietsList().query({userId: $scope.userId});
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }
  })

  .controller('EditTrainingPlanCtrl', function ($scope, $http, $stateParams, TrainingPlan) {

  });
