define(['./module'], function (services) {
    'use strict';
    /**
     * - getResourceFromDb
     * - editResourceAndSaveToDb
     * - addResourceToDb
     * - getTitlesFromDb
     * - deleteResource
     *
     */

    services.factory('ResourceService' , function ($http, ipCookie, CONSTANTS) {
        return{
            getResourceFromDb:function(Id){
                return $http.get(CONSTANTS.API_URL + 'pages/' + Id);

            },
            editResourceAndSaveToDb:function(Id,data){
                return $http.put(CONSTANTS.API_URL + 'pages/' + Id,data);
            },
            addResourceToDb:function(data){
                return $http.post(CONSTANTS.API_URL + 'pages', data);
            },
            getTitlesFromDb:function() {
                return $http({ method: 'GET', url: CONSTANTS.API_URL + 'pages' })
            },
            deleteResource:function(Id){
                return $http.delete(CONSTANTS.API_URL + 'pages/' + Id);
            }




        }


    });

});