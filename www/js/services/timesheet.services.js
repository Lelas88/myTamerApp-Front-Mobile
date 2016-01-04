/**
 * Created by rober on 26.12.2015.
 */

angular.module('timesheet.services', ['ngResource', 'ngRoute', 'constants'])

  .factory('Timesheet', function ($resource, MYTAMER) {
    return {
      saveTimesheet: function() {
        return $resource(MYTAMER.url + '/timesheet');
      },
      getStudentPresences: function() {
        return $resource(MYTAMER.url + '/timesheet/check?groupId=:groupId&dateFrom=:dateFrom&dateTo=:dateTo');
      }
    }
  });
