/**
 * Created by Robert Mastalerek on 16.11.2015.
 */
angular.module('starter.services', ['ngResource'])

  .factory('Session', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
  });

angular.module('dashboard.services', ['ngResource'])

  .factory('Dashboard', function ($resource) {
    return $resource('http://localhost:5000/dashboard/:userId');
  });

angular.module('activity.services', ['ngResource'])

  .factory('Activity', function ($resource) {
    return $resource('http://localhost:5000/activities/:activityId');
  });

