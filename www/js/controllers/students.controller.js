/**
 * Created by rober on 09.12.2015.
 */

angular.module('students.controller', ['students.services'])
  .controller('StudentsCtrl', function ($scope, $http, $stateParams, User, Students) {

    $scope.$on('$ionicView.beforeEnter', function () {
      getUserId();
    });

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            renderStudentList(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function renderStudentList(userId) {
      Students.getUserStudents(userId)
        .success(function (data) {
          $scope.students = data;
        })
        .error(function (e) {
          $scope.status = 'Unable to load groups: ' + e.message;
        });
    }
  })
  .controller('StudentCtrl', function ($scope, $http, $stateParams, Student) {
    $scope.student = Student.get({studentId: $stateParams.studentId});
  });
