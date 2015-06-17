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

    services.factory('ResourceService', function ($http, ipCookie) {
        return{
            getResourceFromDb:function(Alias){
                return $http.get('http://176.36.11.25:8090/api/resources/' + Alias);

            },
            editResourceAndSaveToDb:function(Id,data){
                return $http.put('http://176.36.11.25:8090/api/editResource/' + Id,data);
            },
            addResourceToDb:function(data){
                return $http.post('http://176.36.11.25:8090/api/addResource', data);
            },
            getTitlesFromDb:function() {
                return $http({ method: 'GET', url: 'http://176.36.11.25:8090/api/getTitles' })
            },
            deleteResource:function(id){
                return $http.delete('http://176.36.11.25:8090/api/deleteResource/' + id);
            }




        }


    });

});