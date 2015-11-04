'use strict';

describe('Controller: ShiftCtrl', function () {

  // load the controller's module
  beforeEach(module('taksiajoApp'));

  var ShiftCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShiftCtrl = $controller('ShiftCtrl', {
      $scope: scope
    });
  }));

  
});
