/**
 * Created by rober on 26.12.2015.
 */
angular.module('meals.services', ['ngResource', 'ngRoute', 'constants'])

  .factory('Meal', function ($resource, MYTAMER) {
    return {
      getMealList: function () {
        return $resource(MYTAMER.url + '/meals/byUser?userId=:userId');
      },
      getMealDetails: function () {
        return $resource(MYTAMER.url + '/meals?mealId=:mealId');
      }
    }
  });
