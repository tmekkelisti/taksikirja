'use strict';

/**
 * @ngdoc function
 * @name taksiajoApp.controller:ShiftCtrl
 * @description
 * # ShiftCtrl
 * Controller of the taksiajoApp
 */
angular.module('taksiajoApp')
  .controller('ShiftCtrl', function ($scope, Ref, $firebaseArray, $timeout, user, $firebaseObject) {
    
    $scope.user = user;
    $scope.logout = function() { Auth.$unauth(); };
    var profile = $firebaseObject(Ref.child('users/'+user.uid));
    $scope.shifts = $firebaseArray(Ref.child('users/'+user.uid+'/shifts'));
    console.log(profile);
    $scope.addShift = function(date, earnings) {
      $scope.err = null;
      if( date && earnings ) {

      	var alv0 = 0.9 * earnings; //10% alv poistettu kassasta
      	var provikka = profile.provision;
      	var nettokassa = (0.9 * earnings * provikka) / 100;

      	
      	console.log(provikka);
        $scope.shifts.$add({date: date, earnings: earnings, earnings0: alv0, wage: nettokassa});

      }

    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
