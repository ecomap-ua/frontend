define(['./module'], function (controllers) {

   'use strict';
    controllers.controller('resourcesCtrl',['$scope','$http', '$routeParams', '$rootScope', 'CONSTANTS', function($scope,$http, $routeParams, $rootScope, CONSTANTS) {
            var page;
            $rootScope.data.forEach(function(element) {
                if (element.alias == $routeParams.name) {page = element;};
            });
            $http.get(CONSTANTS.API_URL + 'pages/' + page.id).success(function(data) {
            $scope.resource = data;
            });
            $rootScope.$broadcast('Update', '_full');
        }])
});


