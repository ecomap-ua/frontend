define(['./module'], function(services) {
    'use strict';
    /**
     * - getUserProblemsFromDb
     * - getAllProblemsFromDb
     * - getProblemByIdFromDb
     *
     *
     */

    services.factory('ProblemService', function($http, ipCookie) {
        return {
            getUserProblemsFromDb: function(userId) {
                return $http({
                    method: 'GET',
                    url: "http://176.36.11.25:8090/api/usersProblem/" + userId
                });

            },
            getAllProblemsFromDb: function() {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8000/api/allproblems'
                });
            },
            getProblemDetails: function(problemId) {
                return $http.get("http://localhost:8000/api/problems/" + problemId);

            },
            deletePhotoFromdb: function(link) {
                return $http.delete("http://176.36.11.25:8090/api/photo/" + link);

            },
            addVoteToDB: function(problemID) {
                var req = {
                    url: 'http://127.0.0.1:8000/api/problems/' + problemID + '/vote',
                    method: 'POST',
                    data: null
                };
                return $http(req);
            }

        }


    });

});
