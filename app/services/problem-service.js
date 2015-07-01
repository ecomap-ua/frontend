define(['./module'], function(services) {
    'use strict';
    /**
     * - getUserProblemsFromDb
     * - getAllProblemsFromDb
     * - getProblemByIdFromDb
     *
     *
     */

    services.factory('ProblemService', function($http, CONSTANTS) {
        return {
            //TODO: Need to delete with list of dependents
            getUserProblemsFromDb: function(userId) {
                return $http({
                    method: 'GET',
                    url: "http://176.36.11.25:8090/api/usersProblem/" + userId
                });

            },
            getAllProblemsFromDb: function() {
                return $http({
                    method: 'GET',
                    url: CONSTANTS.API_URL + 'allproblems'
                });
            },
            getProblemDetails: function(problemId) {
                return $http.get(CONSTANTS.API_URL + "problems/" + problemId);

            },
            //TODO: need to change on new api
            deletePhotoFromdb: function(link) {
                return $http.delete("http://176.36.11.25:8090/api/photo/" + link);

            },
            addVoteToDB: function(problemID) {
                var req = {
                    url: CONSTANTS.API_URL + 'problems/' + problemID + '/vote',
                    method: 'POST',
                    data: null
                };
                return $http(req);
            },
            getProblemPhotos: function(problemID) {
                return $http.get(CONSTANTS.API_URL + 'problems/' + problemID + '/photos');
            }
        }


    });

});
