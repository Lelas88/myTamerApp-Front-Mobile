/**
 * Created by rober on 09.12.2015.
 */

angular.module('students.services', ['ngResource', 'ngRoute', 'constants'])

  .factory('Students', function($resource, MYTAMER) {
    return {
      deleteStudent: function() {
        return $resource(MYTAMER.url + '/student?studentId=:studentId');
      },
      getUserStudents: function() {
        return $resource(MYTAMER.url + '/student/user/:userId');
      }
    }
  })
  .factory('Student', function ($resource, MYTAMER) {
    return {
      saveStudent: function () {
        return $resource(MYTAMER.url + '/student/create')
      },
      modifyStudent :function() {
        return $resource(MYTAMER.url + '/student/update', {}, {
          'update' : {method: 'PUT'}
        });
      },
      getUserStudentsWithNoGroupAssigned: function () {
        return $resource(MYTAMER.url + '/student/withNoGroup?userId=:userId');
      },
      verifyLogin: function() {
        return $resource(MYTAMER.url + '/student/credentials/login?login=:login');
      },
      verifyEmail: function() {
        return $resource(MYTAMER.url + '/student/credentials/email?email=:email');
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

