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
      },
      getUnits: function () {
        return $resource(MYTAMER.url + '/exercise/units');
      },
      getDisciplines: function () {
        return $resource(MYTAMER.url + '/exercise/disciplines');
      },
      getAllStudents: function () {
        return $resource(MYTAMER.url + '/exercise/allStudents');
      },
      saveExercise: function () {
        return $resource(MYTAMER.url + '/exercise/save')
      },
      getNotAssignedStudents: function () {
        return $resource(MYTAMER.url + '/exercise/notAssignedStudents?exerciseId=:exerciseId')
      },
      assignStudents: function () {
        return $resource(MYTAMER.url + '/exercise/assignStudents?exerciseId=:exerciseId')
      },
      getExerciseStudents: function () {
        return $resource(MYTAMER.url + '/exercise/getAssignedStudents');
      },
      editExercise: function () {
        return $resource(MYTAMER.url + '/exercise/update', {}, {
          'update': {method: 'PUT'}
        })
      },
      unassignStudent: function () {
        return $resource(MYTAMER.url + '/exercise/unassignStudent?exerciseId=:exerciseId&studentId=:studentId')
      },
      deleteExercise: function () {
        return $resource(MYTAMER.url + '/exercise/delete?exerciseId=:exerciseId')
      }
    }
  });
