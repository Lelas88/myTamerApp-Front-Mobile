/**
 * Created by rober on 03.01.2016.
 */

angular.module('result.services', ['ngResource', 'ngRoute', 'constants'])

  .factory('Result', function ($resource, MYTAMER) {
    return {
      saveResult: function() {
        return $resource(MYTAMER.url + '/result/save');
      }
    }
  });
