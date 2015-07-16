define(['./module'], function(services) {
    'use strict';


    services.factory('UserService', function($http, ipCookie) {
        var saveChangeStatus = true;
        return {
            logIn: function(email, password) {
                return $http.post('http://127.0.0.1:8000/api/login', {
                    email: email,
                    password: password
                });
            },

            logOut: function() {
                if (saveChangeStatus) {
                    return $http.get('http://127.0.0.1:8000/api/logout');
                }
            },

            register: function(username, surname, email, password) {
                return $http.post('http://127.0.0.1:8000/api/register', {
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
                return $http.post('http://176.36.11.25:8090/api/changePassword', dataPassword);

            },

            resetPassword: function(data) {
                return $http.post('http://176.36.11.25:8090/api/resetPassword', data);
            }
        }

    });


});





