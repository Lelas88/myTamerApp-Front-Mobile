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
      },
      addMeal: function() {
        return $resource(MYTAMER.url + '/meals/add');
      },
      updateMeal: function() {
        return $resource(MYTAMER.url + '/meals/update', {}, {
          'update' : {method: 'PUT'}
        });
      },
      deleteMeal: function() {
        return $resource(MYTAMER.url + '/meals/delete?mealId=:mealId');
      },
      saveNutritions: function() {
        return $resource(MYTAMER.url + '/meals/nutritions?mealId=:mealId');
      },
      getNutritions: function() {
        return $resource(MYTAMER.url + '/meals/getNutritions');
      },
      getMealNutritions: function() {
        return $resource(MYTAMER.url + '/meals/mealNutritions?mealId=:mealId');
      }
    }
  });
