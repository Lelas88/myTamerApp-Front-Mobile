// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'dashboard.controller', 'activity.controller', 'beacons.controller', 'students.controller'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl',
        onEnter: function ($state, Auth) {
          if (!Auth.isLoggedIn()) {
            $state.go('login');
          }
        }
      })

      .state('login', {
        url: '/login',
        controller: 'AppCtrl',
        templateUrl: 'templates/login.html'
      })

      .state('app.dashboard', {
        url: "/dashboard",
        views: {
          'menuContent': {
            templateUrl: "templates/views/dashboard.html",
            controller: 'DashboardCtrl'
          }
        }
      })

      .state('app.students', {
        url: "/students",
        views: {
          'menuContent': {
            templateUrl: "templates/views/students.html",
            controller: 'StudentsCtrl'
          }
        }
      })

      .state('app.student', {
        url: "/students/:studentId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/student.html",
            controller: 'StudentCtrl'
          }
        }
      })

      .state('app.surroundings', {
        url: "/surroundings",
        views: {
          'menuContent': {
            templateUrl: "templates/views/surroundings.html",
            controller: 'BeaconsCtrl'
          }
        }
      })

      .state('app.activities', {
        url: "/activities",
        views: {
          'menuContent': {
            templateUrl: "templates/views/activities.html",
            controller: 'ActivitiesCtrl'
          }
        }
      })

      .state('app.activity', {
        url: "/activities/:activityId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/activity.html",
            controller: 'ActivityCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dashboard');
  });
