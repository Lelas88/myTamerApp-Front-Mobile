// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'dashboard.controller', 'beacons.controller',
  'students.controller', 'groups.controller', 'timesheet.controller', 'exercises.controller', 'exercisesets.controller',
  'trainingplans.controller', 'meals.controller', 'mealsets.controller', 'diets.controller'])

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

      .state('app.groups', {
        url: "/groups",
        views: {
          'menuContent': {
            templateUrl: "templates/views/groups.html",
            controller: 'GroupsCtrl'
          }
        }
      })

      .state('app.group', {
        url: "/groups/:groupId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/group.html",
            controller: 'GroupCtrl'
          }
        }
      })

      .state('app.creategroup', {
        url: "/createGroup",
        views: {
          'menuContent': {
            templateUrl: "templates/views/createGroup.html",
            controller: 'CreateGroupCtrl'
          }
        }
      })

      .state('app.editgroup', {
        url: "/editGroup/:groupId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/editGroup.html",
            controller: 'EditGroupCtrl'
          }
        }
      })

      .state('app.timesheet', {
        url: "/timesheet/:groupId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/timesheet.html",
            controller: 'TimesheetCtrl'
          }
        }
      })

      .state('app.presence', {
        url: "/presence/:groupId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/presence.html",
            controller: 'TimesheetCtrl'
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

      .state('app.createstudent', {
        url: "/createStudent",
        views: {
          'menuContent': {
            templateUrl: "templates/views/createStudent.html",
            controller: 'CreateStudentCtrl'
          }
        }
      })

      .state('app.editstudent', {
        url: "/editStudent/:studentId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/editStudent.html",
            controller: 'EditStudentCtrl'
          }
        }
      })

      .state('app.exercises', {
        url: "/exercises",
        views: {
          'menuContent': {
            templateUrl: "templates/views/exercises.html",
            controller: 'ExercisesCtrl'
          }
        }
      })

      .state('app.exercise', {
        url: "/exercises/:exerciseId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/exercise.html",
            controller: 'ExerciseCtrl'
          }
        }
      })

      .state('app.exercisesets', {
        url: "/exercisesets",
        views: {
          'menuContent': {
            templateUrl: "templates/views/exercisesets.html",
            controller: 'ExerciseSetsCtrl'
          }
        }
      })

      .state('app.exerciseset', {
        url: "/exercisesets/:exerciseSetId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/exerciseset.html",
            controller: 'ExerciseSetCtrl'
          }
        }
      })

      .state('app.trainingplans', {
        url: "/trainingplans",
        views: {
          'menuContent': {
            templateUrl: "templates/views/trainingplans.html",
            controller: 'TrainingPlansCtrl'
          }
        }
      })

      .state('app.trainingplan', {
        url: "/trainingplans/:trainingPlanId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/trainingplan.html",
            controller: 'TrainingPlanCtrl'
          }
        }
      })

      .state('app.meals', {
        url: "/meals",
        views: {
          'menuContent': {
            templateUrl: "templates/views/meals.html",
            controller: 'MealsCtrl'
          }
        }
      })

      .state('app.meal', {
        url: "/meals/:mealId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/meal.html",
            controller: 'MealCtrl'
          }
        }
      })

      .state('app.mealsets', {
        url: "/mealsets",
        views: {
          'menuContent': {
            templateUrl: "templates/views/mealsets.html",
            controller: 'MealSetsCtrl'
          }
        }
      })

      .state('app.mealset', {
        url: "/mealsets/:mealSetId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/mealset.html",
            controller: 'MealSetCtrl'
          }
        }
      })

      .state('app.diets', {
        url: "/diets",
        views: {
          'menuContent': {
            templateUrl: "templates/views/diets.html",
            controller: 'DietsCtrl'
          }
        }
      })

      .state('app.diet', {
        url: "/diets/:dietId",
        views: {
          'menuContent': {
            templateUrl: "templates/views/diet.html",
            controller: 'DietCtrl'
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
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dashboard');
  });
