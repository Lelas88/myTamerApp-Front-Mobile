/**
 * Created by Robert Mastalerek on 16.11.2015.
 */
angular.module('starter.services', ['ngResource', 'ngCookies'])

  .factory('Auth', function ($cookieStore) {
    var _user = $cookieStore.get('starter.user');
    var setUser = function (user) {
      _user = user;
      $cookieStore.put('starter.user', _user);
    }

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


angular.module('dashboard.services', ['ngResource'])

  .factory('Dashboard', function ($resource) {
    return $resource('http://localhost:5000/dashboard/:userId');
  });

angular.module('activity.services', ['ngResource'])

  .factory('Activity', function ($resource) {
    return $resource('http://localhost:5000/activities/:activityId');
  });

