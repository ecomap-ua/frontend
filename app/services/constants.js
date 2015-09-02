define(['./module'], function (services) {
    'use strict';

    services.constant('CONSTANTS', {
        API_HOST: 'http://127.0.0.1:8000/',
        //API_HOST: 'http://176.36.11.25:8000/',
        API_URL: API_HOST + 'api/',
        PHOTOS_URL: API_HOST + 'static/photos/',
        THUMBNAILS_URL: API_HOST + 'static/thumbnails/'
    });

});