define(['./module'], function(controllers) {

    'use strict';

    controllers.controller('AdminUserCtrl', ['$scope', '$rootScope', 'ProblemService', '$location', '$window', 'ipCookie', 'UserService', '$modal', '$log',
        function($scope, $rootScope, ProblemService, $location, $window, ipCookie, UserService, $modal, $log) {

            $scope.isLoggedIn = UserService.isLoggedIn;
            $scope.isAdminist = UserService.isAdministrator;
            $scope.checkPermission = UserService.checkPermission
            $scope.name = ipCookie('userName');
            $scope.surname = ipCookie('userSurname');
            $scope.userId = ipCookie('user_id');

            /**--- Getting reg usr problems ---*/
            //TODO in a new api

            /*******--- Login form ---******/
            $scope.postLogIn = function() {
                var data = {};
                data.email = document.login.email.value;
                data.password = document.login.password.value;

                UserService.logIn(data.email, data.password).success(
                    function(userData) {
                        $scope.successLogIn(userData);
                        $rootScope.name = data.first_name;
                        $rootScope.name = data.last_name;
                        $window.location.href="/";
                    }
                ).error(
                    function(data, status) {
                        if (status == 400) {
                            var modalInstance = $modal.open(
                                {
                                    template: '<div class="alert alert-danger fade in">Пароль або пошту введено невірно</div>',
                                    size: "sm"
                                }
                            );
                        }
                    }
                );
            };
            /*******************************/

            /*****--- The main part of facebook authorization ---*****/
            FB.init({
                appId: '903837986321574',
                cookie: true,
                xfbml: true,
                version: 'v2.3'
            });

            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });

            function statusChangeCallback(response) {
                if (response.status === 'connected') {

                    FB.api('/me', function(response) {
                        UserService.logIn(response.email, response.id).success(
                            function(userData) {
                                $scope.successLogIn(userData);
                            }
                        ).error(
                            function(status, data) {
                                console.log(status);
                                console.log(data);
                            }
                        );
                    });

                } else if (response.status === 'not_authorized') {
                    document.getElementById('status').innerHTML = 'Please log into this app.';
                }
            }
            /*********************************************************/

            // This function is called after success login procedure
            $rootScope.successLogIn = function(userData) {
                ipCookie('user_id', userData.user_id);
                ipCookie('userName', userData.first_name);
                ipCookie('userSurname', userData.last_name);
                ipCookie('userRoles', userData.user_roles);
                ipCookie('userPerms', userData.user_perms);
                // I need to set these here, because binding does not work
                // for those above.
                $scope.name = ipCookie('userName');
                $scope.surname = ipCookie('userSurname');

                console.log(ipCookie('userRoles'));
                console.log(ipCookie('userPerms'));
            };

            $scope.showFiltersVar = false;

            $scope.showFilters = function() {
                if ($scope.showFiltersVar === true)
                    $scope.showFiltersVar = false;
                else
                    $scope.showFiltersVar = true;
            };

            $scope.logInFB = function logInFB() {
                FB.login(function(response) {

                    FB.getLoginStatus(function(response) {
                        statusChangeCallback(response);
                    });

                }, {
                    scope: 'publish_stream,email'
                });
            };

            $scope.register = function register(username, surname, email, password, cnfPassword) {

                //and here must be validation!

                UserService.register(username, surname, email, password).success(
                    function(userData) {
                        $scope.successLogIn(userData);

                    }
                ).error(
                    function(status, data) {
                        console.log(status);
                        console.log(data);
                    }
                );
            };

            $scope.logOut = function logOut() {
                successLogOut();
                $rootScope.$broadcast('Update', "");
                FB.logout(function(response) {
                    console.log(response);
                });
            };

            function successLogOut() {
                // this cookie is set by the backend
                ipCookie.remove('user_id');
                ipCookie.remove('userName');
                ipCookie.remove('userSurname');
                ipCookie.remove('userRoles');
                ipCookie.remove('userPerms');
            }

            $scope.changePassword = function() {
                console.log('change password called');
                var modalInstance = $modal.open(
                    {
                        templateUrl: 'app/templates/changePassword.html',
                        controller: 'changePasswordCtrl',
                        size: 'sm',
                        resolve: {
                            items: function() {
                                return $scope.items;
                            }
                        }
                    }
                );

                modalInstance.result.then(
                    function(selectedItem) {
                        $scope.selected = selectedItem;
                    },
                    function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    }
                );
            };

            $scope.resetPassword = function() {
                console.log('reset password called');
                var modalInstance = $modal.open(
                    {
                        templateUrl: 'app/templates/resetPassword.html',
                        controller: 'resetPasswordCtrl',
                        size: 'sm',
                        resolve: {
                            items: function() {
                                return $scope.items;
                            }
                        }
                    }
                );

                modalInstance.result.then(
                    function(selectedItem) {
                        $scope.selected = selectedItem;
                    },
                    function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    }
                );
            };
        }]);
});
