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
            postProblemToDb: function(title, content, proposal, latitude, longitude, problem_type_id) {
                var data = {
                    title: title,
                    content: content,
                    proposal: proposal,
                    latitude: latitude,
                    longitude: longitude,
                    problem_type_id: problem_type_id,
                    region_id: 1,
                    severity: "1",
                    status: "UNSOLVED"
                };
                var req = {
                    url: CONSTANTS.API_URL + 'problems',
                    method: 'POST',
                    data: JSON.stringify(data)
                };
                return $http(req);
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
