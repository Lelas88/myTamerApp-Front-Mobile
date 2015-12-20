/**
 * Created by rober on 16.11.2015.
 */
angular.module('dashboard.controller', ['starter.services', 'dashboard.services', 'chart.js'])
  //Dashboard Controller
  .controller('DashboardCtrl', function ($scope, $http, $ionicSlideBoxDelegate, User, Dashboard) {

    var weight_data_array = [];
    var height_data_array = [];
    var selectedGroup;

    clearTables();
    getUserId();
    initiateChartData();

    $scope.$on('$ionicView.beforeEnter', function () {
      if (selectedGroup != null) {
        renderStudents(selectedGroup);
      } else {
        getUserId();
        initiateChartData();
      }
    });

    $scope.slideHasChanged = function (index) {
      $scope.chosenStudent = $scope.students[index];
      clearTables();
      setChartData($scope.students[index].id);
    };

    $scope.getStudents = function (groupId) {
      selectedGroup = groupId;
      renderStudents(groupId);
    };

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            renderGroups(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function renderGroups(userId) {
      Dashboard.getGroups(userId)
        .success(function (data) {
          $scope.groups = data;
          if ($scope.selectedGroup == null) {
            $scope.selectedGroup = data[0];
          }

          renderStudents($scope.selectedGroup.id);
        })
        .error(function (e) {
          $scope.status = 'Unable to load groups: ' + e.message;
        });
    }

    function renderStudents(groupId) {
      Dashboard.getStudents(groupId)
        .success(function (data) {
          $scope.students = data;
          $scope.chosenStudent = data[0];

          clearTables();
          setChartData(data[0].id);
          setBMIStatus(data[0].bmi);

          $ionicSlideBoxDelegate.update();
          $ionicSlideBoxDelegate.loop(false);
        })
        .error(function (error) {
          $scope.status = 'Unable to load students: ' + error.message;
        });
    }

    function setBMIStatus(bmiValue) {
      if(bmiValue < 18.5) {
        $scope.bmi_status = 1;
      } else if(bmiValue > 18.5 && bmiValue < 25) {
        $scope.bmi_status = 2;
      } else {
        $scope.bmi_status = 3;
      }
    }

    function setChartData(studentId) {
      Dashboard.getChartData(studentId)
        .success(function (data) {
          for (var i = 0; i < data.heights.length; i++) {
            $scope.height_labels.push(data.heights[i].date);
            height_data_array.push(data.heights[i].value);
          }
          for (var j = 0; j < data.weights.length; j++) {
            $scope.weight_labels.push(data.weights[j].date);
            weight_data_array.push(data.weights[j].value);
          }
          $scope.height_data.push(height_data_array);
          $scope.weight_data.push(weight_data_array);
        })
        .error(function (error) {
          $scope.status = 'Unable to load chart data: ' + error.message;
        });
    }

    function initiateChartData() {
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

      $scope.weight_series = [];
      $scope.height_series = [];
      $scope.weight_labels = [];
      $scope.weight_data = [];
      $scope.height_labels = [];
      $scope.height_data = [];
      $scope.weight_series.push("Weight History");
      $scope.height_series.push("Height History");
    }

    function clearTables() {
      weight_data_array = [];
      height_data_array = [];
      $scope.weight_series = [];
      $scope.height_series = [];
      $scope.weight_labels = [];
      $scope.height_labels = [];
      $scope.weight_data = [];
      $scope.height_data = [];
    }
  });
