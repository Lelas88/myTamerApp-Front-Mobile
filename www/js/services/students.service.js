/**
 * Created by rober on 09.12.2015.
 */

angular.module('students.services', ['ngResource', 'ngRoute', 'constants'])

  .service('Students', function($http, Auth, MYTAMER) {

    this.getUserStudents = function (groupId) {
      return $http.get(MYTAMER.url + '/student?groupId=' + groupId);
    };

  });

