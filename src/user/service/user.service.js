(function () {
    'use strict';

    angular
        .module('app.user')
        .factory('userService', userService);

    /* @ngInject */
    function userService(storageService, $stateRegistry) {
        var currentUser;

        var service = {
            setUser: setUser,
            getUser: getUser,
            isLoggedIn: isLoggedIn,
            logout: logout
        };

        return service;

        function setUser(data) {
            currentUser = data;
            storageService.setJsonObject('user', data);
        }

        function getUser() {
            if (!currentUser) {
                currentUser = storageService.getJsonObject('user');
            }
            return currentUser;
        }

        function isLoggedIn() {
            var result = false;
            if (getUser()) {
                result = true;
            }
            return result;
        }

        function logout() {
            storageService.remove('token');
            storageService.remove('refresh_token');
            storageService.remove('user');
            storageService.remove('lastTimeCheck');
            storageService.remove('croot');
            var menuState = storageService.getJsonObject('menu_states');
            if (menuState && menuState.length > 0) {
                menuState.forEach(function (state) {
                    if($stateRegistry.get(state) !== null) {
                        $stateRegistry.deregister(state);
                    }
                });
                storageService.remove('menu_states');
            }
            window.sessionStorage.clear();
            currentUser = undefined;
        }
    }
})();

