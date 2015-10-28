angular.module('firebase.config', [])
  .constant('FBURL', 'https://taksi.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','anonymous','facebook','google'])

  .constant('loginRedirectPath', '/login');
