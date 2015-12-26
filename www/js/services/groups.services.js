/**
 * Created by rober on 25.12.2015.
 */

angular.module('groups.services', ['ngResource', 'ngRoute', 'constants'])

  .service('Groups', function ($http, $resource, User, MYTAMER) {

    this.getUserGroups = function (userId) {
      return $http.get(MYTAMER.url + '/group?userId=' + userId);
    };

  })
  .factory('Group', function ($resource, MYTAMER) {
    return {
      getGroupStudents: function () {
        return $resource(MYTAMER.url + '/student?groupId=:groupId');
      },
      saveTimesheet: function() {
        return $resource(MYTAMER.url + '/timesheet');
      }
      //saveTimesheet: function () {
      //  return $resource(MYTAMER.url + '/timesheet', null, {
      //    save: {
      //      method: 'POST',
      //      isArray: true
      //    }
      //  }, {headers: {"Content-Type": 'application/json'}});
      //}
    }
  });
