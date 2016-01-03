/**
 * Created by rober on 25.12.2015.
 */

angular.module('groups.controller', ['groups.services'])
  .controller('GroupsCtrl', function ($scope, $http, $state, $stateParams, $ionicPopup, User, Student, Groups, Group) {

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.shouldShowDelete = false;
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
      $scope.groups = Groups.getUserGroups().query({userId: userId});
    }

    $scope.onItemDelete = function (group) {
      confirmDeleting(group);
    };

    function confirmDeleting(group) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete?',
        template: 'Are you sure you want to delete group ' + group.name + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          Group.deleteGroup().delete({groupId: group.id});
          $scope.groups.splice($scope.groups.indexOf(group), 1);
          $scope.shouldShowDelete = false;
        }
      });
    }

    $scope.addGroup = function () {
      $state.transitionTo('app.creategroup');
    };
  })

  /********************************************************************************************************************/
  /********************************************************************************************************************/
/************************************************ SINGLE GROUP ******************************************************/
  /********************************************************************************************************************/
  /********************************************************************************************************************/
  .controller('GroupCtrl', function ($scope, $http, $state, $stateParams, $ionicPopup, Group) {

    $scope.$on('$ionicView.beforeEnter', function () {
      loadInitialState();
    });

    $scope.editGroup = function () {
      $state.transitionTo('app.editgroup', {'groupId': $stateParams.groupId});
    };

    $scope.checkTimesheet = function () {
      $state.transitionTo('app.timesheet', {'groupId': $stateParams.groupId});
    };

    $scope.countPresences = function () {
      $state.transitionTo('app.presence', {'groupId': $stateParams.groupId});
    };

    $scope.unassignStudent = function (student) {
      confirmUnassignment(student);
    };

    function loadInitialState() {
      $scope.shouldShowUnassign = false;
      $scope.group = Group.getGroupDetails().get({groupId: $stateParams.groupId});
      $scope.students = Group.getGroupStudents().query({groupId: $stateParams.groupId});
    }

    function confirmUnassignment(student) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Unassign?',
        template: 'Are you sure you want to unassign student ' + student.firstName + ' ' + student.lastName + ' from this group?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          Group.unassignStudent().update({groupId: $stateParams.groupId, studentId: student.id});
          $scope.shouldShowUnassign = false;
          loadInitialState();
        }
      });
    }
  })

  /********************************************************************************************************************/
  /********************************************************************************************************************/
/******************************************** CREATE NEW GROUP ******************************************************/
  /********************************************************************************************************************/
  /********************************************************************************************************************/
  .controller('CreateGroupCtrl', function ($scope, $http, $state, $stateParams, $ionicPopup, User, Student, Groups) {

    var user_id;
    $scope.groupToSave = {
      "id": 0,
      "trainerId": 0,
      "name": ""
    };
    var assignment = [];

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.groupToSave.name = "";
      getUserId();
    });

    $scope.saveGroup = function () {
      if ($scope.groupToSave.name.length > 0) {
        $scope.groupToSave.trainerId = user_id;
        Groups.saveGroup().save($scope.groupToSave, function (newGroup) {
          var newGroupId = parseInt(newGroup.entity);
          Groups.linkStudents().update({groupId: newGroupId}, assignment);
          $state.transitionTo('app.group', {groupId: newGroupId});
        });
      }
    };

    $scope.addToAssignmentList = function (student) {
      if (student.checked) {
        assignment.push(student.id);
      } else {
        var index = assignment.indexOf(student.id);
        assignment.splice(index, 1);
      }
    };

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            setUserStudents(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function setUserStudents(userId) {
      user_id = userId;
      $scope.students = Student.getUserStudentsWithNoGroupAssigned().query({userId: userId});
    }
  })

  /********************************************************************************************************************/
  /********************************************************************************************************************/
/************************************************ MODIFY GROUP ******************************************************/
  /********************************************************************************************************************/
  /********************************************************************************************************************/
  .controller('EditGroupCtrl', function ($scope, $http, $state, $stateParams, $ionicPopup, User, Student, Group, Groups) {
    var user_id;
    $scope.groupToSave = {
      "id": 0,
      "trainerId": 0,
      "name": ""
    };
    var assignment = [];

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.group = Group.getGroupDetails().get({groupId: $stateParams.groupId});
      getUserId();
    });

    $scope.addToAssignmentList = function (student) {
      if (student.checked) {
        assignment.push(student.id);
      } else {
        var index = assignment.indexOf(student.id);
        assignment.splice(index, 1);
      }
    };

    $scope.saveGroup = function () {
      confirmEditing();
    };

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            setUserStudents(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function setUserStudents(userId) {
      user_id = userId;
      $scope.students = Student.getUserStudentsWithNoGroupAssigned().query({userId: userId});
    }

    function confirmEditing() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Modify?',
        template: 'Are you sure you want to modify this group?'
      });

      confirmPopup.then(function (res) {
        $scope.groupToSave.name = $scope.group.name;
        $scope.groupToSave.id = $scope.group.id;
        $scope.groupToSave.trainerId = $scope.group.trainerId;
        if (res) {
          if ($scope.groupToSave.name.length > 0) {
            Group.updateGroup().update($scope.groupToSave);
            Groups.linkStudents().update({groupId: $scope.group.id}, assignment);
            $state.transitionTo('app.group', {groupId: $scope.group.id});
          }
        }
      });
    }
  });
