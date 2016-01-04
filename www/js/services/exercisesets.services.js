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
      },
      saveExerciseSet: function () {
        return $resource(MYTAMER.url + '/exerciseSet/save');
      },
      updateExerciseSet: function () {
        return $resource(MYTAMER.url + '/exerciseSet/update', {}, {
          'update': {method: 'PUT'}
        });
      },
      assignExercises: function() {
        return $resource(MYTAMER.url + '/exerciseSet/assignExercises?exerciseSetId=:exerciseSetId');
      },
      unassignExercises: function() {
        return $resource(MYTAMER.url + '/exerciseSet/unassignExercise?exerciseSetId=:exerciseSetId&exerciseId=:exerciseId');
      },
      deleteExerciseSet: function() {
        return $resource(MYTAMER.url + '/exerciseSet/delete?exerciseSetId=:exerciseSetId');
      },
      getExercisesNotAssignedToExerciseSet: function() {
        return $resource(MYTAMER.url + '/exerciseSet/getExercisesNotAssigned?exerciseSetId=:exerciseSetId');
      }
    }
  });
