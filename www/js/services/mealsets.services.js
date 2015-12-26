/**
 * Created by rober on 26.12.2015.
 */
angular.module('mealsets.services', ['ngResource', 'ngRoute', 'constants'])

  .factory('MealSet', function ($resource, MYTAMER) {
    return {
      getMealSetsList: function () {
        return $resource(MYTAMER.url + '/mealSet/byUser?userId=:userId');
      },
      getMealSetDetails: function () {
        return $resource(MYTAMER.url + '/mealSet?mealSetId=:mealSetId');
      }
    }
  });
