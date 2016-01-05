/**
 * Created by rober on 26.12.2015.
 */

angular.module('trainingplans.controller', ['trainingplans.services'])
  .controller('TrainingPlansCtrl', function ($scope, $http, $state, $stateParams, $ionicPopup, User, TrainingPlan) {

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
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete?',
        template: 'Are you sure you want to delete training plan ' + trainingPlan.name + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          TrainingPlan.deleteTrainingPlan().delete({trainingPlanId: trainingPlan.id});
          $scope.trainingPlans.splice($scope.trainingPlans.indexOf(trainingPlan), 1);
          $scope.shouldShowDelete = false;
        }
      });
    };

    $scope.addTrainingPlan = function () {
      $state.transitionTo('app.addtrainingplan');
    };
  })

  .controller('TrainingPlanCtrl', function ($scope, $http, $stateParams, $state, $ionicPopup, TrainingPlan) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.trainingPlan = TrainingPlan.getTrainingPlanDetails().get({trainingPlanId: $stateParams.trainingPlanId});
      $scope.diets = TrainingPlan.getAssignedDietsToTrainingPlan().query({trainingPlanId: $stateParams.trainingPlanId});
      console.log($scope.diets);
    });

    $scope.editTrainingPlan = function () {
      $state.transitionTo('app.edittrainingplan', {trainingPlanId: $stateParams.trainingPlanId});
    };

    $scope.unassignExerciseSet = function(exerciseSet) {
      unassignEntity(exerciseSet.name, exerciseSet, $scope.trainingPlan.name, 'exerciseset');
      $scope.showDeleteExerciseSet = false;
    };

    $scope.unassignStudent = function(student) {
      var studentName = student.firstName + ' ' + student.lastName;
      unassignEntity(studentName, student, $scope.trainingPlan.name, 'student');
      $scope.showDeleteStudent = false;
    };

    $scope.unassignDiet = function(diet) {
      unassignEntity(diet.name, diet, $scope.trainingPlan.name, 'diet');
      $scope.showDeleteDiet = false;
    };

    $scope.setActiveDiet = function() {
      $state.transitionTo('app.activediet', {trainingPlanId: $stateParams.trainingPlanId});
    };

    function unassignEntity(name, entity, trainingPlan, type) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Unassign?',
        template: 'Are you sure you want to unassign ' + type + ' ' + name + ' from training plan ' + trainingPlan + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          if(type == 'student') {
            TrainingPlan.unassignStudentFromTrainingPlan().delete({trainingPlanId: $stateParams.trainingPlanId, studentId: entity.id});
          } else if(type == 'exerciseset') {
            TrainingPlan.unassignExerciseSetFromTrainingPlan().delete({trainingPlanId: $stateParams.trainingPlanId, exerciseSetId: entity.id});
          } else if(type == 'diet') {
            TrainingPlan.unassignDietFromTrainingPlan().delete({trainingPlanId: $stateParams.trainingPlanId, dietId: entity.id});
          }
        }
        $scope.showDeleteDiet = false;
        $scope.showDeleteStudent = false;
        $scope.showDeleteExerciseSet = false;
      });
    };
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

  .controller('EditTrainingPlanCtrl', function ($scope, $http, $stateParams, $state, $ionicPopup, TrainingPlan, User) {
    var exerciseSetsAssignment = [];
    var studentsAssignment = [];
    var dietsAssignment = [];

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.trainingPlanToSave = TrainingPlan.getTrainingPlanDetails().get({trainingPlanId: $stateParams.trainingPlanId});
      getUserId();
    });

    $scope.modifyTrainingPlan = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Modify?',
        template: 'Are you sure you want to modify this training plan?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          TrainingPlan.updateTrainingPlan().update($scope.trainingPlanToSave);
          $state.transitionTo('app.trainingplan', {trainingPlanId: $scope.trainingPlanToSave.id});
          TrainingPlan.assignExerciseSetsToTrainingPlan().save({trainingPlanId: $scope.trainingPlanToSave.id}, exerciseSetsAssignment);
          TrainingPlan.assignDietToTrainingPlan().save({trainingPlanId: $scope.trainingPlanToSave.id}, dietsAssignment);
          TrainingPlan.assignStudentsToTrainingPlan().save({trainingPlanId: $scope.trainingPlanToSave.id}, studentsAssignment);
        }
      });
    };

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

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            renderData(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function renderData(userId) {
      $scope.students = TrainingPlan.getNotAssignedStudentsToTrainingPlan().query({
        trainingPlanId: $stateParams.trainingPlanId,
        userId: userId
      });
      $scope.exerciseSets = TrainingPlan.getNotAssignedExerciseSetsToTrainingPlan().query({
        trainingPlanId: $stateParams.trainingPlanId,
        userId: userId
      });
      $scope.diets = TrainingPlan.getNotAssignedDietsToTrainingPlan().query({
        trainingPlanId: $stateParams.trainingPlanId,
        userId: userId
      });
    }

  })

  .controller('ActiveTrainingPlanCtrl', function ($scope, $http, $stateParams, $state, TrainingPlan) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.diets = TrainingPlan.getAssignedDietsToTrainingPlan().query({trainingPlanId: $stateParams.trainingPlanId});
    });

    $scope.setActiveDiet = function(diet) {
      TrainingPlan.updateDietStatus().update({trainingPlanId: $stateParams.trainingPlanId, dietId: diet.id});
      $state.transitionTo('app.trainingplan', {trainingPlanId: $stateParams.trainingPlanId});
    };
  });
