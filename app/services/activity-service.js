define(['./module'], function (services) {
    'use strict';
    /**
     *  - addVoteToDbAndToCookie
     *  - addCommentToDB
     *  - deleteCommentFromDB
     *
     *
     *
     *
     */

    services.factory('ActivityService', function ($http, ipCookie) {
        return{
            getProblemComments:function(problemId) {
                return $http.get("http://localhost:8000/api/v1/problems/" + problemId + "/comments");

            },
            addVoteToDbAndToCookie: function (problemID,userID,userName,userSurname) {

                return $http.post('http://176.36.11.25:8090/api/vote', {idProblem: problemID, userId: userID, userName: userName,userSurname:userSurname})
                .success(function (data, status, headers, config) {
                    ipCookie('vote' + problemID, true);
                })
                .error(function (data, status, headers, config) {
                    throw error;
                });
             },
            /*
            addCommentToDB:function(userID,userName,userSurname,problemID,comment,updateScope) {
                if(comment==""|| comment == undefined){
                    alert("Неможливо відправити пусте повідомлення");
                    return;
                }
                var data = {data: {userId: userID, userName: userName,userSurname:userSurname, Content: comment}};
                return $http.post('http://176.36.11.25:8090/api/comment/' + problemID, JSON.stringify(data))
                .success(function (data, status, headers, config) {

                         updateScope(data);

                    })
                .error(function (data, status, headers, config) {
                    throw error;
                });
            },
            */
            addCommentToDB:function(comment, problemID, userID) {
                if(!comment){
                    alert("Неможливо відправити пусте повідомлення");
                    return;
                }
                var data = {user_id: userID, content: comment};
                var req = {
                    url: 'http://localhost:8000/api/v1/problems/' + problemID + '/comments',
                    method: 'POST',
                    data: JSON.stringify(data)
                };
                return $http(req);
            },
            deleteCommentFromDB:function(id){
                return $http.delete('http://176.36.11.25:8090/api/activity/' + id)
                    .success(function (data, status, headers, config) {
                          })
                    .error(function (data, status, headers, config) {
                       throw error;
                });
            }
        }


    });

});