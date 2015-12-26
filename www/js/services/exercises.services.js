/**
 * Created by rober on 26.12.2015.
 */
angular.module('exercises.services', ['ngResource', 'ngRoute', 'constants'])

  .factory('Exercises', function ($resource, MYTAMER) {
    return {
      getExerciseList: function () {
        return $resource(MYTAMER.url + '/exercise/byUser?userId=:userId');
      },
      getExerciseDetails: function () {
        return $resource(MYTAMER.url + '/exercise?exerciseId=:exerciseId');
      }
    }
  });
