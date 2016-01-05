/**
 * Created by rober on 26.12.2015.
 */
angular.module('trainingplans.services', ['ngResource', 'ngRoute', 'constants'])

  .factory('TrainingPlan', function ($resource, MYTAMER) {
    return {
      getTrainingPlanList: function () {
        return $resource(MYTAMER.url + '/trainingPlan/byUser?userId=:userId');
      },
      getTrainingPlanDetails: function () {
        return $resource(MYTAMER.url + '/trainingPlan?trainingPlanId=:trainingPlanId');
      },
      createTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/create');
      },
      deleteTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/delete?trainingPlanId=:trainingPlanId');
      },
      updateTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/update', {}, {
          'update': {method: 'PUT'}
        })
      },
      assignStudentsToTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/assignStudents?trainingPlanId=:trainingPlanId')
      },
      assignExerciseSetsToTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/assignExerciseSets?trainingPlanId=:trainingPlanId')
      },
      unassignStudentFromTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/unassignStudent?trainingPlanId=:trainingPlanId&studentId=:studentId')
      },
      unassignExerciseSetFromTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/unassignExerciseSet?trainingPlanId=:trainingPlanId&exerciseSetId=:exerciseSetId')
      },
      assignDietToTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/assignDiets?trainingPlanId=:trainingPlanId')
      },
      unassignDietFromTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/unassignDiet?trainingPlanId=:trainingPlanId&dietId=:dietId')
      },
      getNotAssignedStudentsToTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/notAssignedStudents?trainingPlanId=:trainingPlanId&userId=:userId')
      },
      getNotAssignedExerciseSetsToTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/notAssignedExerciseSets?trainingPlanId=:trainingPlanId&userId=:userId')
      },
      getNotAssignedDietsToTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/notAssignedDiets?trainingPlanId=:trainingPlanId&userId=:userId')
      },
      getAssignedStudentsToTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/assignedStudents?trainingPlanId=:trainingPlanId')
      },
      getAssignedExerciseSetsToTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/assignedExerciseSets?trainingPlanId=:trainingPlanId')
      },
      getAssignedDietsToTrainingPlan: function () {
        return $resource(MYTAMER.url + '/trainingPlan/assignedDiets?trainingPlanId=:trainingPlanId')
      },
      updateDietStatus: function () {
        return $resource(MYTAMER.url + '/trainingPlan/activeDiet?trainingPlanId=:trainingPlanId&dietId=:dietId', {
          trainingPlanId: '@trainingPlanId',
          dietId: '@dietId'
        }, {
          'update': {method: 'PUT', isArray: true}
        })
      }
    }
  });
