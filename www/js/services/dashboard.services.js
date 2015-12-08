/**
 * Created by rober on 06.12.2015.
 */

angular.module('dashboard.services', ['ngResource', 'ngRoute', 'constants'])

  .service('Dashboard', function($http, Auth, MYTAMER) {

    this.getUserId = function() {
      return $http.get(MYTAMER.url + '/user/getId?username=' + Auth.getUser());
    };

    this.getGroups = function (userId) {
      return $http.get(MYTAMER.url + '/group?userId=' + userId);
    };

    this.getStudents = function (groupId) {
      return $http.get(MYTAMER.url + '/student?groupId=' + groupId);
    };

    this.getChartData = function (studentId) {
      return $http.get(MYTAMER.url + '/measurement/history?studentId=' + studentId);
    };

  });
