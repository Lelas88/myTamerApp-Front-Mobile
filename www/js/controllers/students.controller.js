/**
 * Created by rober on 09.12.2015.
 */

angular.module('students.controller', ['students.services'])
  .controller('StudentsCtrl', function ($scope, $http, $state, $stateParams, $ionicPopup, User, Students) {

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.shouldShowDelete = false;
      getUserId();
    });

    $scope.addStudent = function () {
      $state.transitionTo('app.createstudent');
    };

    $scope.onItemDelete = function (student) {
      confirmDeleting(student);
    };

    function confirmDeleting(student) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete?',
        template: 'Are you sure you want to delete student ' + student.firstName + ' ' + student.lastName + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          Students.deleteStudent().delete({studentId: student.id});
          $scope.students.splice($scope.students.indexOf(student), 1);
          $scope.shouldShowDelete = false;
        }
      });
    }

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
      $scope.students = Students.getUserStudents().query({userId: userId});
    }
  })


  .controller('StudentCtrl', function ($scope, $http, $state, $stateParams, Student) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.student = Student.studentData().get({studentId: $stateParams.studentId});
    });
    $scope.studentTraningPlans = Student.studentTraningPlans().query({studentId: $stateParams.studentId});
    $scope.studentContraindications = Student.studentContraindications().query({studentId: $stateParams.studentId});
    $scope.studentDiets = Student.studentDiets().query({studentId: $stateParams.studentId});

    $scope.editStudent = function () {
      $state.transitionTo('app.editstudent', {studentId: $stateParams.studentId});
    };
  })


  .controller('CreateStudentCtrl', function ($scope, $filter, $state, $http, $ionicPopup, $stateParams, User, UserFactory, Student) {

    $scope.studentToSave = {
      "id": 0,
      "firstName": null,
      "lastName": null,
      "birthdate": null,
      "weight": null,
      "height": null,
      "trainerId": ""
    };

    $scope.studentCredentials = {
      "email": null,
      "login": null,
      "password": null,
      "studentId": null
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.birthdate = $filter("date")(new Date(), 'yyyy-MM-dd');
    });

    $scope.saveStudent = function () {
      checkLoginAllowed();
    };

    function checkLoginAllowed() {
      Student.verifyLogin().get({login: $scope.studentCredentials.login}, function (data) {
        if (!angular.isUndefined(data.username)) {
          userWithGivenLoginExists();
        } else {
          checkEmailAllowed();
        }
      });
    }

    function checkEmailAllowed() {
      Student.verifyEmail().get({email: $scope.studentCredentials.email}, function (data) {
        if (!angular.isUndefined(data.username)) {
          userWithGivenEmailExists();
        } else {
          saveStudent();
        }
      });
    }

    function saveStudent() {
      getUserIdAndSaveStudent();
    }

    function getUserIdAndSaveStudent() {
      User.getUserId()
        .success(function (data) {
          $scope.studentToSave.trainerId = data;
          $scope.studentToSave.birthdate = $scope.birthdate;
          Student.saveStudent().save($scope.studentToSave, function (newStudent) {
            var newStudentId = parseInt(newStudent.entity);
            $scope.studentCredentials.studentId = newStudentId;
            registerStudent();
            $state.transitionTo('app.student', {studentId: newStudentId});
          });
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function registerStudent() {
      UserFactory.generateStudentUser().save($scope.studentCredentials);
    }

    function userWithGivenLoginExists() {
      var informationPopup = $ionicPopup.alert({
        title: 'User exists',
        template: 'User with given login (' + $scope.studentCredentials.login + ')  already exists.'
      });

      informationPopup.then(function (res) {
        if (res) {
        }
      });
    }

    function userWithGivenEmailExists() {
      var informationPopup = $ionicPopup.alert({
        title: 'User exists',
        template: 'User with given email (' + $scope.studentCredentials.email + ') already exists.'
      });

      informationPopup.then(function (res) {
        if (res) {
        }
      });
    }
  })

  .controller('EditStudentCtrl', function ($scope, $filter, $state, $ionicPopup, $stateParams, Student) {

    $scope.studentToSave = {
      "id": 0,
      "firstName": null,
      "lastName": null,
      "birthdate": null,
      "weight": null,
      "height": null,
      "trainerId": ""
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.student = Student.studentData().get({studentId: $stateParams.studentId}, function (data) {
        setDate($scope, data.birthdate);
      });
    });

    $scope.saveStudent = function () {
      var informationPopup = $ionicPopup.confirm({
        title: 'Confirm changes',
        template: 'Do you really want to modify this student data?'
      });

      informationPopup.then(function (res) {
        if (res) {
          console.log($scope.student.birthdate);
          Student.modifyStudent().update($scope.student, function () {
            $state.transitionTo('app.students');
          });
        }
      });
    };
  });


function setDate($scope, birthdate) {
  $scope.student.birthdate = new Date(birthdate);
}
