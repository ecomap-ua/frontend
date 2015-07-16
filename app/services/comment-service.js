define(['./module'], function (services) {
    'use strict';
    /**
     *  - getProblemComments
     *  - addCommentToDB
     *
     *
     *
     *
     *
     */

    services.factory('CommentService', function ($http, CONSTANTS) {
        return{
            getProblemComments:function(problemId) {
                return $http.get(CONSTANTS.API_URL + "problems/" + problemId + "/comments");

            },
            postProblemComment:function(comment, problemID, userID) {
                if(!comment){
                    alert("Неможливо відправити пусте повідомлення");
                    return;
                }
                var data = {content: comment};
                var req = {
                    url: CONSTANTS.API_URL + 'problems/' + problemID + '/comments',
                    method: 'POST',
                    data: JSON.stringify(data)
                };
                return $http(req);
            }
        }


    });

});
