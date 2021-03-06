'use strict';

/**
 * @ngdoc overview
 * @name taksiajoApp
 * @description
 * # taksiajoApp
 *
 * Main module of the application.
 */
angular.module('taksiajoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.ref',
    'firebase.auth',
    'ui.bootstrap'
  ]);



angular.module('taksiajoApp').run(function($rootScope, Auth) {
    $rootScope.logout = function() {
        Auth.$unauth();
    };
});