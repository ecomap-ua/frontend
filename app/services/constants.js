define(['./module'], function (services) {
    'use strict';
    var API_HOST = 'http://127.0.0.1:8000/';
    //http://176.36.11.25:8000/
    services.constant('CONSTANTS', {
        API_URL: API_HOST + 'api/',
        PHOTOS_URL: API_HOST + 'static/photos/',
        THUMBNAILS_URL: API_HOST + 'static/thumbnails/'
    });

});