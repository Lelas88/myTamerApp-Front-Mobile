/**
 * Created by rober on 09.12.2015.
 */

angular.module('students.services', ['ngResource', 'ngRoute', 'constants'])

  .service('Students', function ($http, $resource, User, MYTAMER) {

    this.getUserStudents = function (userId) {
      return $http.get(MYTAMER.url + '/student/user/' + userId);
    };

  })
  .factory('Student', function ($resource, MYTAMER) {
    return {
      getUserStudentsWithNoGroupAssigned: function () {
        return $resource(MYTAMER.url + '/student/withNoGroup?userId=:userId');
      },
      studentData: function () {
        return $resource(MYTAMER.url + '/student/:studentId');
      },
      studentTraningPlans: function () {
        return $resource(MYTAMER.url + '/trainingPlan/byStudent/:studentId');
      },
      studentContraindications: function () {
        return $resource(MYTAMER.url + '/student/contraindications/:studentId');
      },
      studentDiets: function () {
        return $resource(MYTAMER.url + '/student/diet/:studentId');
      }
    }
  });

