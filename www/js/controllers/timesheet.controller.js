/**
 * Created by rober on 26.12.2015.
 */

angular.module('timesheet.controller', ['timesheet.services', 'ngCordova'])
  .controller('TimesheetCtrl', function ($scope, $http, $stateParams, $ionicPopup, $state, Group, Timesheet) {

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
      $scope.timesheet = presence;
      if (presence.length > 0) {
        Timesheet.saveTimesheet().save($scope.timesheet, function () {
          showConfirmation();
        });
      } else {
        showError();
      }
    };

    function showConfirmation() {
      var confirmationPopup = $ionicPopup.alert({
        title: 'Confirmation',
        template: 'Timesheet saved!'
      });
      confirmationPopup.then(function (res) {
        presence = [];
        $state.transitionTo('app.group', {'groupId': $stateParams.groupId});
      });
    }

    function showError() {
      var errorPopup = $ionicPopup.alert({
        title: 'Error',
        template: 'Select at least one student.'
      });
      errorPopup.then(function (res) {
      });
    }
  })
  .controller('PresenceCtrl', function ($scope, $http, $stateParams, $ionicPopup, $state, Group, Timesheet) {

    $scope.dates = {
      dateFrom: null,
      dateTo: null
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.dates.dateFrom = new Date();
      $scope.dates.dateTo = new Date();
      getPresences();
    });

    $scope.checkPresences = function () {
      getPresences();
    };

    $scope.togglePresence = function (presence) {
      if ($scope.isPresenceShown(presence)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = presence;
      }
    };
    $scope.isPresenceShown = function (presence) {
      return $scope.shownGroup === presence;
    };

    function getPresences() {
      $scope.presenceDates = Timesheet.getStudentPresences().query({
        groupId: $stateParams.groupId,
        dateFrom: $scope.dates.dateFrom.toISOString().substring(0, 10),
        dateTo: $scope.dates.dateTo.toISOString().substring(0, 10)
      });
    }
  });
