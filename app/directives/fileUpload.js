define(['./module'],function(directives) {
    directives.directive('fileUpload', function() {
        return {
            restrict: 'E',
            controller: ['$scope','$routeParams','FileUploader','CONSTANTS', function ($scope, $routeParams, FileUploader, CONSTANTS) {
                var uploader = $scope.uploader = new FileUploader({
                    url: CONSTANTS.API_URL + 'problems/' + $routeParams.problemID + '/photos',
                    withCredentials: true,
                    alias: 'photos'
                });
                // FILTERS

                uploader.filters.push({
                    name: 'customFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        return this.queue.length < 10;
                    }
                });

                // CALLBACKS

                uploader.onBeforeUploadItem = function (item) {
                    item.formData.push({"comments": item.comments});
                };
                uploader.onCompleteAll = function () {
                    //TODO: Need to add refreshing of photos when upload is complete
                };
            }],
            templateUrl: 'app/templates/fileUpload.html'
        };
    });
});