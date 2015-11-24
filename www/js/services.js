/**
 * Created by Robert Mastalerek on 16.11.2015.
 */
angular.module('starter.services', ['ngResource', 'ngCookies'])

  .factory('Auth', function ($cookieStore) {
    var _user = $cookieStore.get('starter.user');
    var setUser = function (user) {
      _user = user;
      $cookieStore.put('starter.user', _user);
    };

    return {
      setUser: setUser,
      isLoggedIn: function () {
        return _user ? true : false;
      },
      getUser: function () {
        return _user;
      },
      logout: function () {
        $cookieStore.remove('starter.user');
        _user = null;
      }
    }
  });

/* ------------------------------------------------------------- */
/* ----------------------- Dashboard -------------------------- */
/* ------------------------------------------------------------- */
angular.module('dashboard.services', ['ngResource', 'ngRoute'])

  .factory('Dashboard', function ($resource) {
    return $resource('http://localhost:5000/dashboard/:userId');
  })

  .factory('Group', function ($resource) {
    //return $resource('http://localhost:5000/groups/user_id/:userId', {userId: '@userId'});
    return $resource('http://localhost:5000/groups/user_id/:user_id');
  })

  .factory('Student', function ($resource) {
    return $resource('http://localhost:5000/students/group/:group_id');
  })

  .factory('StudentData', function ($resource) {
    return $resource('http://localhost:5000/students_data/group/:group_id');
  })

  .factory('BasicHistory', function ($resource) {
    return $resource('http://localhost:5000/basic_history/student/:student_id');
  })

  .factory('WeightHistory', function ($resource) {
    return $resource('http://localhost:5000/weight_history/student/:student_id');
  })

  .factory('HeightHistory', function ($resource) {
    return $resource('http://localhost:5000/height_history/student/:student_id');
  })

  .factory('HistoryDates', function ($resource) {
    return $resource('http://localhost:5000/history_dates/student/:student_id');
  });

/* ------------------------------------------------------------- */
/* ----------------------- Activities -------------------------- */
/* ------------------------------------------------------------- */
angular.module('activity.services', ['ngResource'])

  .factory('Activity', function ($resource) {
    return $resource('http://localhost:5000/activities/:activityId');
  });

/* ------------------------------------------------------------- */
/* -------------------------- Beacons -------------------------- */
/* ------------------------------------------------------------- */
angular.module('beacons.services', ['ngCordovaBeacon']);

