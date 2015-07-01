define(['./module'],function(services){
    'use strict';
    services.constant('windowWidth', function(){
    	return {
    		getWindowDimensions: function() {
    			return window.innerWidth;
    		}
    	};
    });
});