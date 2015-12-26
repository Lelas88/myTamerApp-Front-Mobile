/**
 * Created by rober on 26.12.2015.
 */
angular.module('exercisesets.services', ['ngResource', 'ngRoute', 'constants'])

  .factory('ExerciseSet', function ($resource, MYTAMER) {
    return {
      getExerciseSetsList: function () {
        return $resource(MYTAMER.url + '/exerciseSet/byUser?userId=:userId');
      },
      getExerciseSetDetails: function () {
        return $resource(MYTAMER.url + '/exerciseSet?exerciseSetId=:exerciseSetId');
      }
    }
  });
