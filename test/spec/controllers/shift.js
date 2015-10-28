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

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
