/**
 * Created by rober on 26.12.2015.
 */

angular.module('timesheet.controller', ['timesheet.services'])
  .controller('TimesheetCtrl', function ($scope, $http, $stateParams, Group, Timesheet) {

    var presence = [];

    $scope.$on('$ionicView.beforeEnter', function () {
      presence = [];
    });

    $scope.students = Group.getGroupStudents().query({groupId: $stateParams.groupId});

    $scope.addToPresenceList = function (student) {
      if (student.checked) {
        presence.push(student.id);
      } else {
        var index = presence.indexOf(student.id);
        presence.splice(index, 1);
      }
    };

    $scope.saveTimesheet = function () {
      //Group.saveTimesheet().save({ "studentIds": presence});
      //$scope.timesheet = presence;
      //Timesheet.saveTimesheet().save($scope.timesheet, function() {
      //  console.log("timesheet saved");
      //});
      $http.post('http://localhost:8100/mytamer/timesheet', {studentIds: presence})
        .success(function(response) {
          console.log(response);
        })
        .error(function(e) {
          console.log(e);
        });
    };
  });
