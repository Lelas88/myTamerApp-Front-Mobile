/**
 * Created by rober on 26.12.2015.
 */

angular.module('diets.controller', ['diets.services'])
  .controller('DietsCtrl', function ($scope, $http, $stateParams, User, Diet) {

    $scope.$on('$ionicView.beforeEnter', function () {
      shouldShowDelete: false
      getUserId();
    });

    function getUserId() {
      User.getUserId()
        .success(function (data) {
          $scope.userId = data;
          if (data != null) {
            renderDietList(data);
          }
        })
        .error(function (e) {
          $scope.status = 'Unable to load userId: ' + e.message;
        });
    }

    function renderDietList(userId) {
      $scope.diets = Diet.getDietsList().query({userId: userId});
    }

    $scope.onItemDelete = function (diet) {
      alert("Deleting diet " + diet.name);
      $scope.diets.splice($scope.diets.indexOf(diet), 1);
    };
  })
  .controller('DietCtrl', function ($scope, $http, $stateParams, Diet) {
    $scope.diet = Diet.getDietDetails().get({dietId: $stateParams.dietId});
  });
