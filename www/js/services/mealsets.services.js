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
      },
      saveMealSet: function () {
        return $resource(MYTAMER.url + '/mealSet/save');
      },
      updateMealSet: function() {
        return $resource(MYTAMER.url + '/mealSet/update', {}, {
          'update' : {method: 'PUT'}
        });
      },
      deleteMealSet: function() {
        return $resource(MYTAMER.url + '/mealSet/delete');
      },
      getMealSetMeals: function() {
        return $resource(MYTAMER.url + '/mealSet/mealsAssigned?mealSetId=:mealSetId');
      },
      getMealsNotAssigned: function() {
        return $resource(MYTAMER.url + '/mealSet/mealsNotAssigned?mealSetId=:mealSetId&userId=:userId');
      },
      assignMeals: function() {
        return $resource(MYTAMER.url + '/mealSet/assignMeals?mealSetId=:mealSetId');
      },
      unassignMeal: function() {
        return $resource(MYTAMER.url + '/mealSet/unassignMeal?mealSetId=:mealSetId&mealId=:mealId');
      }
    }
  });
