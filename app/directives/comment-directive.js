define(['./module'],function(directives){
    directives.directive('comment',function(){
        return {
            restrict: 'EA',
            controller:"CommentCtrl",
            templateUrl: 'app/templates/comment.html'

        };
    });
});
