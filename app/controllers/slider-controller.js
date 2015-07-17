define(['./module'], function(controllers) {
    'use strict';
    controllers.controller('SlideCtrl', function ($scope,$rootScope,CONSTANTS) {


        $scope.hideSlider = function(){
            $rootScope.$emit('showSlider','false');
        };

        $rootScope.$on('get',function(event,message){


            $scope.slides = [];
            $scope.photos = $rootScope.photos;

            for(var i=0;i<$scope.photos.length;i++){

                $scope.slides.push({
                    image: CONSTANTS.PHOTOS_URL + $scope.photos[i].name,
                    text: $scope.photos[i].comment
                })
            }

        });
    });
});
