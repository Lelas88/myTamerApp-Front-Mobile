/**
 * Created by rober on 25.12.2015.
 */

angular.module('groups.services', ['ngResource', 'ngRoute', 'constants'])

  .factory('Groups', function ($resource, MYTAMER) {
    return {
      getUserGroups: function () {
        return $resource(MYTAMER.url + '/group?userId=:userId');
      },
      saveGroup: function () {
        return $resource(MYTAMER.url + '/group/createGroup');
      },
      linkStudents: function () {
        return $resource(MYTAMER.url + '/group/linkStudents?groupId=:groupId', {}, {
          'update': {method: 'PUT'}
        });
      }
    }
  })
  .factory('Group', function ($resource, MYTAMER) {
    return {
      updateGroup: function () {
        return $resource(MYTAMER.url + '/group/updateGroup', {}, {
          'update': {method: 'PUT'}
        });
      },
      unassignStudent: function () {
        return $resource(MYTAMER.url + '/group/unassignStudent?groupId=:groupId&studentId=:studentId', {
          groupId: '@groupId',
          studentId: '@studentId'
        }, {
          update: {method: 'PUT', isArray: true}
        });
      },
      getGroupStudents: function () {
        return $resource(MYTAMER.url + '/student?groupId=:groupId');
      },
      saveTimesheet: function () {
        return $resource(MYTAMER.url + '/timesheet');
      },
      getGroupDetails: function () {
        return $resource(MYTAMER.url + '/group/getOne?groupId=:groupId');
      },
      deleteGroup: function () {
        return $resource(MYTAMER.url + '/group/delete?groupId=:groupId');
      }
    }
  });
