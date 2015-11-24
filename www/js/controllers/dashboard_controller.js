/**
 * Created by rober on 16.11.2015.
 */
angular.module('dashboard.controller', ['dashboard.services', 'chart.js'])
  //Dashboard Controller
  .controller('DashboardCtrl', function ($scope, $http, $ionicSlideBoxDelegate, Dashboard) {
    $scope.dashboard = Dashboard.query();
    //$scope.chosenStudent = {};
    //$scope.students = {};
    //$scope.groups = {};
    //$scope.height_series = [];
    //$scope.height_data = [];
    //$scope.height_labels = [];
    //$scope.weight_series = [];
    //$scope.weight_labels = [];
    //$scope.weight_data = [];
    $scope.weight_colours = [{
      fillColor: 'rgba(255,5,15,0.3)',
      strokeColor: 'rgba(255,5,15,0.4)',
      highlightFill: 'rgba(255,5,15,0.4)',
      highlightStroke: 'rgba(255,5,15,0.4)'
    }];
    $scope.height_colours = [{
      fillColor: 'rgba(47, 132, 71, 0.3)',
      strokeColor: 'rgba(47, 132, 71, 0.8)',
      highlightFill: 'rgba(47, 132, 71, 0.8)',
      highlightStroke: 'rgba(47, 132, 71, 0.8)'
    }];

    $scope.$on('$ionicView.beforeEnter', function () {
      renderGroups();
    });

    //students
    $scope.getStudents = function (selectedGroup) {
      renderStudents(selectedGroup);
      $scope.$on('$ionicView.beforeEnter', function () {
        renderStudents(selectedGroup);
      });
    };

    $scope.slideHasChanged = function (index) {
      $scope.chosenStudent = $scope.students[index];
      setChartData($scope.students[index].id);
    };

    $scope.countAge = function (birthday) {
      var difference = Date.now() - new Date(birthday).getTime();
      var ageDate = new Date(difference);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    $scope.changeDateFormat = function (birthday) {
      return dateFormat(new Date(birthday), "dd mmmm yyyy");
    };

    $scope.heightLineType = function() {
      var chart = angular.element( document.querySelector( '#height_bar' ) );
      chart.removeClass('chart-bar');
      chart.addClass('chart-line');
      var temp_data = [];
      chart.setAttribute('data', temp_data);
    };

    //-----------------------------------------------------------------
    //-------------------------- functions ----------------------------
    //-----------------------------------------------------------------
    //charts
    function setChartData(studentId) {
      $http({
        method: 'GET',
        url: 'http://localhost:5000/weight_history/student/' + studentId
      })
        .success(function (data) {
          setWeightData(data)
        })
        .error(function (data) {
          console.log("Could not get student data");
        });
      $http({
        method: 'GET',
        url: 'http://localhost:5000/height_history/student/' + studentId
      })
        .success(function (data) {
          setHeightData(data);
        })
        .error(function (data) {
          console.log("Could not get student data");
        });
    }

    // groups
    function renderGroups() {
      $http({
        method: 'GET',
        url: 'http://localhost:5000/groups/user_id/' + 1
      })
        .success(function (data) {
          $scope.groups = data;
          $scope.selectedGroup = data[0];
          renderStudents(data[0].id);
          setChartData(data[0].id);
          $ionicSlideBoxDelegate.update();
          $ionicSlideBoxDelegate.loop(true);
        })
        .error(function (data) {
          console.log("Could not get groups data");
        });
    }

    //students
    function renderStudents(groupId) {
      $http({
        method: 'GET',
        url: 'http://localhost:5000/students_data/group/' + groupId
      })
        .success(function (data) {
          $scope.students = data;
          $scope.chosenStudent = data[0];
          $ionicSlideBoxDelegate.update();
          $ionicSlideBoxDelegate.loop(true);
        })
        .error(function (data) {
          console.log("Could not get student data");
        });
    }

    function setWeightData(data) {
      clearWeightArrays();
      $scope.weight_labels = data[0].dates;
      $scope.weight_data.push(data[0].weights);
      $scope.weight_series.push("Weight History");
    }

    function setHeightData(data) {
      clearHeightArrays();
      $scope.height_labels = data[0].dates;
      $scope.height_data.push(data[0].heights);
      $scope.height_series.push("Height History");
    }

    function clearWeightArrays() {
      $scope.weight_series = [];
      $scope.weight_series = [];
      $scope.weight_data = [];
    }

    function clearHeightArrays() {
      $scope.height_series = [];
      $scope.height_series = [];
      $scope.height_data = [];
    }
  });
