/**
 * Created by rober on 26.12.2015.
 */
angular.module('diets.services', ['ngResource', 'ngRoute', 'constants'])

  .factory('Diet', function ($resource, MYTAMER) {
    return {
      getDietsList: function () {
        return $resource(MYTAMER.url + '/diet/byUser?userId=:userId');
      },
      getDietDetails: function () {
        return $resource(MYTAMER.url + '/diet?dietId=:dietId');
      },
      saveDiet: function () {
        return $resource(MYTAMER.url + '/diet/save');
      },
      updateDiet: function () {
        return $resource(MYTAMER.url + '/diet/update', {}, {
          'update' : {method: 'PUT'}
        });
      },
      deleteDiet: function () {
        return $resource(MYTAMER.url + '/diet/delete?dietId=:dietId');
      },
      assignDietToTrainingPlans: function () {
        return $resource(MYTAMER.url + '/diet/assignDietToTrainingPlans?dietId=:dietId');
      },
      assignMealSetsToDiet: function () {
        return $resource(MYTAMER.url + '/diet/assignMealSetsToDiet?dietId=:dietId');
      },
      unassignMealSetFromDiet: function () {
        return $resource(MYTAMER.url + '/diet/unassignMealSet?dietId=:dietId&mealSetId=:mealSetId');
      },
      unassignDietFromTrainingPlan: function () {
        return $resource(MYTAMER.url + '/diet/unassignFromTrainingPlan?dietId=:dietId&trainingPlanId=:trainingPlanId');
      },
      getNotAssignedTrainingPlans: function () {
        return $resource(MYTAMER.url + '/diet/notAssignedTrainingPlans?dietId=:dietId&userId=:userId');
      },
      getNotAssignedMealSets: function () {
        return $resource(MYTAMER.url + '/diet/notAssignedMealSets?dietId=:dietId&userId=:userId');
      }
    }
  });
