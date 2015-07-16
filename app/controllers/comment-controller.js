define(['./module'], function (controllers) {

    'use strict';

    controllers.controller('CommentCtrl', ['$scope', '$rootScope', '$routeParams','CommentService', function ($scope,$rootScope, $routeParams,CommentService) {

        $scope.addComment = function(comment) {
            CommentService.postProblemComment(comment, $routeParams.problemID, $scope.userId)
                .success(function (data, status, headers, config) {
                    document.getElementById('commentAdd').value = '';
                    return $scope.loadComments();
                });
        };
        //TODO: Need to refactor this func
        /*$scope.deleteComment = function(commentId) {
            CommentService.deleteCommentFromDB(commentId).then(function(){
                for(var i=0;i<$scope.comments.length;i++){
                    if($scope.comments[i].Id==commentId) {
                        $scope.comments.splice(i,1);
                    }
                }

            });

        };*/
        $scope.loadComments = function() {
            CommentService.getProblemComments($routeParams.problemID).success(function (data) {
                $scope.comments = data.data;
            });
        };
    }]);
});
