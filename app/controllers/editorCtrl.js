define(['./module'], function (controllers) {
   'use strict';
    controllers.controller('editorCtrl',['$scope', '$rootScope', '$routeParams', '$location','ResourceService', function ($scope, $rootScope, $routeParams, $location,ResourceService) {

        if ($routeParams.Alias) {

            var page;
                $rootScope.data.forEach(function(element) {
                    if (element.alias == $routeParams.Alias) {page = element;};
                });

            ResourceService.getResourceFromDb(page.id)
                .success(function(data) {
                    $scope.resource = data;
                    $scope.Alias = $scope.resource.alias;
                    $scope.Content = $scope.resource.content;
                    $scope.Title = $scope.resource.title;
                    $scope.IsResource = $scope.resource.is_resource;
                    $scope.Id = $scope.resource.id;
                
            });
        }
        else {
            $scope.IsResource = 1
        }
        $rootScope.$broadcast('Update', '_full');
        $scope.sendResource = function(Alias, Content, Title, IsResource, Id) {
                if (Id){
            ResourceService.editResourceAndSaveToDb(Id,{alias: Alias, content: Content, title: Title, is_resource : IsResource+""})
                .success(function() {
                    $rootScope.getTitles();
                    $location.path('resources/' + Alias);
              }).error(function(data, status) {
                switch (data.err) {
                    case "ER_BAD_NULL_ERROR":
                    $scope.errorMsq = "Заповніть всі поля!";
                    break;
                    case "ER_DUP_ENTRY":
                    $scope.errorMsq = "Вже існує ресурс з таким заголовком або alias!";
                    break;
                    default:
                    $scope.errorMsq = "Перевірте правильність заповнення усіх полів!";
                }
                if (data == "Unauthorized") $scope.errorMsq = "У вас немає прав на додавання ресурсів!";
                    console.log(data)
                    console.log(status)
                });
       }
       else {
                    ResourceService.addResourceToDb({ alias: Alias, content: Content, title: Title, is_resource: IsResource+""})
                      .success(function() {
                            $rootScope.getTitles();
                            $location.path('resources/' + Alias);
                    }).error(function(data, status) {
                switch (data.err) {
                    case "ER_BAD_NULL_ERROR":
                    $scope.errorMsq = "Заповніть всі поля!";
                    break;
                    case "ER_DUP_ENTRY":
                    $scope.errorMsq = "Вже існує ресурс з таким заголовком або alias!";
                    break;
                    default:
                    $scope.errorMsq = "Перевірте правильність заповнення усіх полів!";
                }
                if (data == "Unauthorized") $scope.errorMsq = "У вас немає прав на додавання ресурсів!";
                    console.log(data)
                    console.log(status)
                });
       };
        };
    }]);
        });
