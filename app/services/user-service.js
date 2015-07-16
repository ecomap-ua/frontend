define(['./module'], function(services) {
    'use strict';


    services.factory('UserService', function($http, ipCookie, CONSTANTS) {
        var saveChangeStatus = true;
        return {
            logIn: function(email, password) {
                return $http.post(CONSTANTS.API_URL+'login', {
                    email: email,
                    password: password
                });
            },

            logOut: function() {
                if (saveChangeStatus) {
                    return $http.get(CONSTANTS.API_URL+'logout');
                }
            },

            register: function(username, surname, email, password) {
                return $http.post(CONSTANTS.API_URL+'register', {
                    first_name: username,
                    last_name: surname,
                    email: email,
                    password: password
                });
            },

            isLoggedIn: function() {
                return !!ipCookie('user_id');
            },

            isAdministrator: function() {
                if (ipCookie('userRoles')) {
                    return !!(~ipCookie('userRoles').search('admin'));
                }
            },

            // Check out all user permissions that are logged to the
            // console when a user logs in.
            checkPermission: function(name) {
                return !!(~ipCookie('userPerms').indexOf(name));
            },

            setSaveChangeStatus: function(status) {
                saveChangeStatus = status;
            },

            getSaveChangeStatus: function() {
                return saveChangeStatus;
            },

            changePassword: function(dataPassword) {
                return $http.post(CONSTANTS.API_URL+'changePassword', dataPassword);

            },

            resetPassword: function(data) {
                return $http.post(CONSTANTS.API_URL+'resetPassword', data);
            }
        }

    });


});





