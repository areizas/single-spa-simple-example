/* jshint -W101,-W106, -W117 */
// jscs:disable
(function () {
    'use strict';

    angular
        .module('app.user')
        .factory('auth', auth);

    /* @ngInject */
    function auth($http, $q, environmentConfig, storageService, userService) {
        var service = {
            getLogin: getLogin,
            isTokenValid: isTokenValid,
            getAuthUser: getAuthUser
        };

        return service;

        function getLogin(data) {

            var serviceData = {
                'grant_type': 'password',
                'client_id': 1,
                'client_secret': 'PU8KCsFQKkxaPGfwq2zrtYVHFpwwvgSaYlKNm4zX',
                'username': data.email,
                'password': data.password
            };

            return $http.post(environmentConfig.userAPI + '/oauth/token', serviceData)
                .then(successToken)
                .catch(failToken);

            function successToken(response) {
                var result = response.data;
                storageService.set('token', result.access_token);
                storageService.set('refresh_token', result.refresh_token);
                storageService.set('lastTimeCheck', new Date());
                userService.setUser(result.user);
            }

            function failToken(error) {
                storageService.remove('token');
                return $q.reject(error);
            }
        }

        function isTokenValid() {

            var last = new Date(storageService.get('lastTimeCheck'));
            var now = new Date();


            if (Math.abs((now.getTime() - last.getTime()) / 60000) >= 30) {
                return getAuthUser()
                    .then(success)
                    .catch(fail);

            } else {
                return $q(function (resolve) {
                    var token = storageService.get('token');
                    if( token !== '' && token !== null && token !== undefined){
                        resolve(true);
                    }
                    else{
                        resolve(false);
                    }

                });
            }

            function success() {
                storageService.set('lastTimeCheck', now);
                return true;
            }

            function fail() {
                userService.logout();
                return false;
            }
        }

        function getAuthUser() {
            return $http.get(environmentConfig.userAPI + '/user')
                .then(successGetUser)
                .catch(failGetUser);

            function successGetUser(response) {
                if (response.data.id !== undefined && response.data.id !== '' && response.data.id !== null) {
                    userService.setUser(response.data);
                    return response.data;
                } else {
                    return $q.reject(error);
                }
            }

            function failGetUser(error) {
                return $q.reject(error);
            }
        }
    }
})();
