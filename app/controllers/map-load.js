define(['./module'], function(controllers) {
    'use strict';
    controllers.controller('mapLoadCtrl', ['$scope', 'ProblemService', '$rootScope', 'UserService', '$routeParams', '$route', '$location', 'todayTime', '$timeout', 'windowWidth', function($scope, ProblemService, $rootScope, UserService, $routeParams, $route, $location, todayTime, $timeout, windowWidth) {
        $scope.isAdministrator = UserService.isAdministrator;
        $scope.getWindowDimensions = windowWidth.getWindowDimensions;

        $rootScope.$broadcast('Update', "");

        var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            minZoom: 2,
            detectRetina: true,
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
        var geoJson = L.geoJson(ukraineBorders, {
            style: {
                opacity: 0,
                fillOpacity: 0
            }
        });
        var latlng = L.latLng(50.00, 32.00);

        L.Map.prototype.panToOffset = function(latlng, paddingL, paddingT, paddingR, paddingB) {
            var x1 = latlng.lat - 0.01,
                y1 = latlng.lng - 0.01,
                x2 = latlng.lat + 0.01,
                y2 = latlng.lng + 0.01;
            return this.fitBounds([[x1, y1], [x2, y2]], {
                maxZoom: 14,
                paddingTopLeft: [paddingL, paddingT],
                paddingBottomRight: [paddingR, paddingB]
            });
        };

        $rootScope.map = L.map('map-content', {
            center: latlng,
            zoom: 7,
            minZoom: 2,
            //maxBounds: L.latLngBounds(L.latLng(43, 19), L.latLng(53, 46)),
            layers: [tiles, geoJson]
        });
        $timeout($rootScope.map.invalidateSize.bind($rootScope.map), 200);
        $rootScope.geoJson = geoJson; //forwarding geoJson object to $rooTscope
        var markers = L.markerClusterGroup();
        $scope.data = {};
        var markerIcon;

        $rootScope.getProblemsAndPlaceMarkers = function() {
            ProblemService.getAllProblemsFromDb()
                .success(function(data) {
                    $scope.data = data;
                    placeMarkers($scope.data);
                })
                .error(function(data, status, headers, config) {
                    throw error;
                });
        };
        $scope.getProblemsAndPlaceMarkers();

        $scope.locateUser = function() {
            navigator.geolocation.getCurrentPosition(getUserPosition);
            var width = $scope.getWindowDimensions();

            function getUserPosition(position) {
                var mapCenter = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                if (width < 1000) {
                    $rootScope.map.panToOffset(mapCenter, 0, 90, 0, 0);
                } else {
                    $rootScope.map.panToOffset(mapCenter, 0, 0, 600, 0);
                }
            }
        }

        function onMarkerClick(marker) {
            if (UserService.getSaveChangeStatus()) {
                $scope.uploadRightSide = false;
                window.location.href = "#/map";
                window.location.href = "#/problem/showProblem/" + this._id;
            }

        }

        function placeMarkers(data) {
            markers.clearLayers();
            var newData = userSelectionFilterMarkers(data);
            angular.forEach(newData, function(problem) {
                markerIcon = L.icon({
                    //iconUrl : 'images/markers/'+location['ProblemTypes_Id']+ '.png',
                    iconUrl: 'images/markers/' + problem.problem_type_id + '.png',
                    iconAnchor: [25, 79]
                });

                //var marker = L.marker([location.Latitude, location.Longtitude], {icon: markerIcon});
                var marker = L.marker([problem.Latitude, problem.Longitude], {icon: markerIcon});
                marker.on('click', onMarkerClick);
                marker._id = problem['id'];
                markers.addLayer(marker);
                $rootScope.map.addLayer(markers);
            });
            $rootScope.map.addLayer(markers);
        };

        function userSelectionFilterMarkers(data) {
            var tempData = [];
            for (var i = 0; i < data.length; i++) {
                var problem = data[i];
                var problemTypeSelected = isSelected($scope.problemTypes, problem.problem_type_id);
                //var problemStatusSelected = isSelected($scope.problemStatuses, problem.status);
                var problemStatusSelected = true;
                if (problemTypeSelected && problemStatusSelected) {
                    tempData.push(problem);
                }
            }
            //var newData = dateRange(tempData);
            return tempData;
        };

        function isSelected(filtersArray, ProblemTypes_Id) {
            for (var i = 0; i < filtersArray.length; i++) {
                if (filtersArray[i].id == ProblemTypes_Id) {
                    return filtersArray[i].selected;
                }
            }
        }

        function dateRange(data) {
            var dateFrom = Date.parse(todayTime.formDataDt);
            var dateTill = Date.parse(todayTime.formDataDtSecond);
            var tempData = [];
            for (var i = 0; i < data.length; i++) {
                var problem = data[i];
                var locationDate = Date.parse(problem.Date);
                if (dateFrom < locationDate && locationDate < dateTill) {
                    tempData.push(problem);
                }
            }
            var newData = tempData;
            return newData;
        }

        $scope.problemTypes = [
            {name: 'problem_type_0', id: 1, selected: true},
            {name: 'problem_type_1', id: 2, selected: true},
            {name: 'problem_type_2', id: 3, selected: true},
            {name: 'problem_type_3', id: 4, selected: true},
            {name: 'problem_type_4', id: 5, selected: true},
            {name: 'problem_type_5', id: 6, selected: true},
            {name: 'problem_type_6', id: 7, selected: true},
            {name: 'problem_type_7', id: 8, selected: true}
        ];

        $scope.problemStatuses = [
            {name: 'SOLVED', selected: true},
            {name: 'UNSOLVED', selected: true}
        ];

        $scope.placeUserProblemsChecker;
        $scope.toggleSelection = function() {
            if ($scope.placeUserProblemsChecker)
                placeMarkers($scope.dataUserProblems);
            else
                placeMarkers($scope.data);
        };

    }]);
});
