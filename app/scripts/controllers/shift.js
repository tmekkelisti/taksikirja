'use strict';

/**
 * @ngdoc function
 * @name taksiajoApp.controller:ShiftCtrl
 * @description
 * # ShiftCtrl
 * Controller of the taksiajoApp
 */
angular.module('taksiajoApp')
  .controller('ShiftCtrl', function ($filter, Auth, $scope, Ref, $firebaseArray, $timeout, user, $firebaseObject) {
    $scope.isCollapsed = true;
    $scope.user = user;
    $scope.logout = function() { Auth.$unauth(); };
    var profile = $firebaseObject(Ref.child('users/'+user.uid));
    //$scope.shifts = $firebaseArray(Ref.child('users/'+user.uid+'/shifts'));
    

    //ladataan vuorot scopeen vasta kun date on filtteröity
    var shifts = $firebaseArray(Ref.child('users/'+user.uid+'/shifts'));
    shifts.$loaded(
      function(shifts) {
        console.log(shifts);
        angular.forEach(shifts, function(shift) {
          var dt = new Date(shift.date);
          shift.date = dt;          
        });
        $scope.shifts = shifts;

      });
      
    //päivitetään uuteen vuoroon date filtteri  
    shifts.$watch(function(){
        angular.forEach(shifts, function(shift) {
          //shift.date = $filter('date')(shift.date, "dd/MM/yyyy");
          shift.date = new Date(shift.date);
        });
        $scope.shifts = shifts;
        $scope.sumMonth();
    });

    $scope.selectedMonth = new Date().getMonth();

    var monthNames = ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu',
        'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'];



    $scope.$watch('selectedMonth', function(){
      if($scope.selectedMonth == "") {
        $scope.monthName = 'Vuosikatsaus';
      }else{
        $scope.monthName = monthNames[$scope.selectedMonth];
      }
        
        $scope.sumMonth();
    });

    $scope.monthFilter = function(element){
      if(!$scope.selectedMonth){
        return true;
      } 
      return element.date.getMonth() == $scope.selectedMonth;
    };



    $scope.addShift = function(date, earnings) {
      $scope.err = null;
      if( date && earnings ) {

      	var alv0 = 0.9 * earnings; //10% alv poistettu kassasta
      	var provikka = profile.provision;
      	var nettokassa = (0.9 * earnings * provikka) / 100;

      	

        $scope.shifts.$add({date: date.getTime(), earnings: earnings, earnings0: alv0, wage: nettokassa});

      }

    };

    $scope.sumMonth1 = "";

    $scope.sumMonth = function(){
      var alv = 0;
      var alv0 = 0;
      var wage = 0;
      

      if($scope.selectedMonth == ""){
        angular.forEach(shifts, function(shift) {     
            alv = alv + shift.earnings;
            alv0 = alv0 + shift.earnings0;
            wage = wage + shift.wage;
        });
      }else {
        angular.forEach(shifts, function(shift) {
          if(shift.date.getMonth() == $scope.selectedMonth){
            alv = alv + shift.earnings;
            alv0 = alv0 + shift.earnings0;
            wage = wage + shift.wage;
          }
        });
      }

      var tyel = 0.057 * wage;
      var tvm = 0.0065 * wage;
      var tax = (profile.tax / 100) * wage;
      var pay = wage - tyel - tvm - tax;

      $scope.sumMonth1 = ({
        alv: alv,
        alv0: alv0,
        wage: wage,
        tyel: tyel,
        tvm: tvm,
        tax: tax,
        pay: pay
      });

    };


    $scope.today = function(){
      $scope.date = new Date();
    };

    $scope.date = $scope.today();
    
    $scope.yesterday = function(){
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      $scope.date = yesterday;
    };



  });
