define(['./module'],function(directives) {
    directives.directive('fileUpload', function() {
        return {
            restrict: 'E',
            controller: function ($scope, $route, $location) {

                $scope.uploader.filters.push({
                    name: 'imageFilter',
                    fn: function(item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                });


                // CALLBACKS
                $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
                    $scope.file_error = response.message;
                };
            },
            templateUrl: 'app/templates/fileUpload.html'
        }
    });
})