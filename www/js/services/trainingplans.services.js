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
      }
    }
  });
