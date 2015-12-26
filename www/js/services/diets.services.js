/**
 * Created by rober on 26.12.2015.
 */
angular.module('diets.services', ['ngResource', 'ngRoute', 'constants'])

  .factory('Diet', function ($resource, MYTAMER) {
    return {
      getDietsList: function () {
        return $resource(MYTAMER.url + '/diet/byUser?userId=:userId');
      },
      getDietDetails: function () {
        return $resource(MYTAMER.url + '/diet?dietId=:dietId');
      }
    }
  });
