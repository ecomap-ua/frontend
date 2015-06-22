define(['./module'], function (controllers) {

    'use strict';

    controllers.controller('ActivityCtrl', ['$scope', '$rootScope', '$routeParams','ActivityService', function ($scope,$rootScope, $routeParams,ActivityService) {

        /*
        $scope.addComment = function(comment) {
            ActivityService.addCommentToDB($scope.userId,$scope.name,$scope.surname,$routeParams.problemID,comment,updateScope);
            function updateScope(data){
                $scope.activities = data[0].reverse();
                for(var i=0;i<$scope.activities.length;i++){
                    if($scope.activities[i].userId!=1) {
                        $scope.activities[i].Content = JSON.parse($scope.activities[i].Content);
                    }
                }
                $scope.commentContent="";
            }
        };
        */
        $scope.addComment = function(comment) {
            ActivityService.addCommentToDB(comment, $routeParams.problemID, $scope.userId)
                .success(function (data, status, headers, config) {
                    return $scope.loadComments();
                });
        };
        $scope.deleteComment = function(commentId) {
            ActivityService.deleteCommentFromDB(commentId).then(function(){
                for(var i=0;i<$scope.activities.length;i++){
                    if($scope.activities[i].Id==commentId) {
                        $scope.activities.splice(i,1);
                    }
                }

            });

        };
        $scope.loadComments = function() {
            ActivityService.getProblemComments($routeParams.problemID).success(function (data) {
                $scope.activities = data.data;
            });
        };
    }]);
});
