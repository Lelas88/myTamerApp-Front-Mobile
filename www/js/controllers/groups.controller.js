/**
 * Created by rober on 25.12.2015.
 */

angular.module('groups.controller', ['groups.services'])
  .controller('GroupsCtrl', function ($scope, $http, $stateParams, User, Groups) {

    $scope.$on('$ionicView.beforeEnter', function () {
      shouldShowDelete: false
      getUserId();
    });

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            renderGroupsList(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function renderGroupsList(userId) {
      Groups.getUserGroups(userId)
        .success(function (data) {
          $scope.groups = data;
        })
        .error(function (e) {
          $scope.status = 'Unable to load groups: ' + e.message;
        });
    }

    $scope.onItemDelete = function (group) {
      alert("Deleting group " + group.name);
      $scope.groups.splice($scope.groups.indexOf(group), 1);
    };
  })
  .controller('GroupCtrl', function ($scope, $http, $state, $stateParams, Group) {
    $scope.students = Group.getGroupStudents().query({groupId: $stateParams.groupId});

    $scope.checkTimesheet = function () {
      $state.transitionTo('app.timesheet', {'groupId': $stateParams.groupId});
    };

  });
