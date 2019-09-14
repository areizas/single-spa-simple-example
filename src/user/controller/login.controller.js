import angular from 'angular';
import template from './template/login.html';

angular
.module('User-app')
.component('login', {
  template,
})


/*(function () {
    'use strict';

    angular
        .module('app.user')
        .controller('LoginController', LoginController);

    
    function LoginController(logger, auth, $state, $filter, $stateRegistry, hierachyService, componentService, routerHelper) {
        var vm = this;
        vm.login = login;

        function login() {
            vm.showLoader = true;
            auth.getLogin(vm.credential)
                .then(successLogin)
                .catch(failLogin);

            function successLogin() {
                vm.showLoader = false;
                return hierachyService.getMenu(2).then(getNewMenuSuccess);

                function getNewMenuSuccess(data) {
                    data.forEach(function (state) {
                      try {
                        $stateRegistry.register(state);
                      }
                      catch(err) {
                          console.log('StateRegistry'+err.message);
                      }
                    });

                  try {
                    addComponentRoute();
                  }
                  catch(err) {
                    console.log('AddComponentRoute'+err.message);
                  }
                  try {
                    $state.go('dashboard');
                  }
                  catch(err) {
                    console.log('StateGo'+err.message);
                  }
                  logger.success($filter('translate')('LOGIN_SUCCESS'));
                }
            }

            function failLogin() {
                vm.showLoader = false;
                logger.error($filter('translate')('LOGIN_FAILED'));
            }
        }

        function addComponentRoute() {
            var routes = routerHelper.getStates();
            var componentStateFound = false;
            routes.forEach(function(state) {
                if(state.name === 'component') {
                    componentStateFound = true;
                }
            });

            if(!componentStateFound) {
                var result = componentService.getComponentsRoute();
                routerHelper.configureStates(result);
            }
        }
    }
})
();
*/