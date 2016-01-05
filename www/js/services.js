/**
 * Created by Robert Mastalerek on 16.11.2015.
 */
angular.module('starter.services', ['ngResource', 'ngCookies', 'constants'])

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
        return _user.username;
      },
      logout: function () {
        $cookieStore.remove('starter.user');
        _user = null;
      }
    }
  })
  .service('User', function ($http, MYTAMER, Auth) {
    this.getUserId = function () {
      return $http.get(MYTAMER.url + '/user/getId?username=' + Auth.getUser());
    };
  })
  .factory('UserFactory', function (MYTAMER, $resource) {
    return {
      generateStudentUser: function () {
        return $resource(MYTAMER.url + '/user/registerStudent')
      }
    }
  });
/* ------------------------------------------------------------- */
/* -------------------------- Beacons -------------------------- */
/* ------------------------------------------------------------- */
angular.module('beacons.services', ['ngCordovaBeacon', 'ngResource', 'ngRoute', 'constants'])
  .factory('Beacon', function (MYTAMER, $resource) {
    return {
      matchBeaconExercises: function () {
        return $resource(MYTAMER.url + '/beacon/getExercises');
      },
      downloadExercises: function () {
        return $resource(MYTAMER.url + '/beacon/downloadExercises?userId=:userId');
      }
    }
  });

