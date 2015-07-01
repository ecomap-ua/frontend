define(['./module'], function(controllers){
    'use strict';
    controllers.controller('showProblemCtrl',['$scope','$routeParams','ProblemService','ipCookie','$rootScope','$modal','adminToShowProblemService','$window','UserService','CommentService','$route','CONSTANTS', function ($scope,$routeParams,ProblemService,ipCookie,$rootScope,$modal,adminToShowProblemService,$window, UserService,CommentService,$route,CONSTANTS){
        $scope.isAdministrator = UserService.isAdministrator;

        if($scope.uploadRightSide){
            $route.reload();
        }
        $scope.fileSizeLeft = 20;
        $scope.fileCountLeft = 10;
        adminToShowProblemService.setEditStatus($scope.isAdministrator());
        $scope.editStatusClass = adminToShowProblemService.getEditStatus(3);
        $scope.delStatus = adminToShowProblemService.getEditStatus(0);
        if(adminToShowProblemService.getNotApprovedProblemListQty () != 0){
            $scope.addStatus = adminToShowProblemService.getEditStatus(2);
        }else{
            $scope.addStatus = adminToShowProblemService.getEditStatus(3);
        }

        $rootScope.$broadcast('Update',"_problem");
        $rootScope.$emit('showSlider','false');
        $scope.PHOTOS_URL = CONSTANTS.PHOTOS_URL;
        $scope.showSlider = false;
        $scope.showSliderFunc = function(){
            $rootScope.$emit('showSlider','true');
            $rootScope.$emit('get');
        };
        if(ipCookie('vote'+$routeParams.problemID)==true){
          
          $scope.disableVoteButton=true;
        } else{
          $scope.disableVoteButton=false;
        }
        $scope.showDropField = false;
        $scope.showAddPhotoButton = true;
        var userID;
        var problemID;
        var problem;
        var activity;
        var tempStatus;
        var problemModerationStatus;
        var tempContent = '';
        //get problem info
        ProblemService.getProblemDetails($routeParams.problemID).success(function (data) {
            if(data.error) {
                $rootScope.$broadcast('Update',"_hide");
                window.location.href="#/map";
            } else {
                $scope.problem = {};
                $scope.problem.Severity = parseInt(data.severity) || 1;
                $scope.problem.Content = data.content || 'опис відсутній';
                $scope.problem.Title = data.title  || 'назва відсутня';
                $scope.problem.CreatedDate = data.datetime;
                $scope.problem.userName = data.first_name;
                $scope.problem.userSurname = data.last_name;
                $scope.problem.Proposal = data.proposal;
                $scope.problem.Votes = data.votes_numbers;
                $scope.problem.status = data.status;
            }
        });

        ProblemService.getProblemPhotos($routeParams.problemID).success(function (data) {
            $scope.photos = data;
        });

        //TODO: Changed api, need to fix
        $scope.addOneVote = function(){
            ProblemService.addVoteToDB($routeParams.problemID)
                .then(function(){
                    $scope.problem.Votes++;
                    $scope.disableVoteButton=true;
            });
        };
        $scope.deletePhoto = function(index){
            ProblemService.deletePhotoFromdb($scope.photos[index].Link)
                .success(function (data, status, headers, config) {
                    var tempArray=[];
                   for(var i =0;i<$scope.photos.length;i++)
                   {
                       if(i!=index){
                           tempArray.push($scope.photos[i]);

                       }
                   }
                    $scope.photos = tempArray;
                    console.log($scope.photos);
                })
                .error(function (data, status, headers, config) {
                    throw error;
                });
        }

       

        $scope.icons=[];
        $scope.icons[1]="fa-map-marker";
        $scope.icons[2]="fa-pencil";
        $scope.icons[3]="fa-heart";
        $scope.icons[4]="fa-file-image-o";
        $scope.icons[5]="fa-weixin";


        //show message over the Severity rating
        $rootScope.isReadonly = $scope.isAdministrator()?false:true;

        var severityMessage = {
            1:'Локальна проблема (стосується будинку/двору)',
            2:'Середня проблема (стосується кількох будинків/дворів)',
            3:'Велика проблема (охоплює цілий район або місто / впливає на екологію)',
            4:'Дуже велика проблема (охоплює область або велике місто / значно впливає на екологію)',
            5:'Всеукраїнська проблема (може вплинути на всю країну / глобальна проблема)'
        };

        $scope.showMessageOverRating = function(rate){
            $scope.severityMessage = severityMessage[rate];
            $scope.showStatus = true;
            $scope.value = rate;
        };
        //TODO:Need to refactor
        /*
        $scope.resetRating = function (rate){
            $scope.showStatus = false;
        };
        //hide popup message for user
        $scope.hideSeverityLabel = function(){
            $scope.severityMessage = "";
            $scope.showStatus = false;
        };
        */
        
        //if user did not submit changes
        $scope.$on('$locationChangeStart', function(event,next) {
            if (!UserService.getSaveChangeStatus()) {
                event.preventDefault();
                var text = 'Будь ласка, підтвердіть зміни';
                var approveCaption = 'Зберігти зміни';
                var cancelCaption = 'Скасувати';
                adminToShowProblemService.showModalMessage(text, 'sm', approveCaption, cancelCaption).then(
                    function () {
                        adminToShowProblemService.saveChangestoDbProblemDescription(problem, $scope.problem.Severity, $scope.problem.Content, $scope.problem.Proposal, $scope.problem.Title, $scope.checkedbox)
                            .then(function () {
                                adminToShowProblemService.showScopeNotApprovedProblemFromList(problem);
                                $scope.editStatusClass = adminToShowProblemService.getEditStatus(3);
                                UserService.setSaveChangeStatus(true);
                                adminToShowProblemService.redirectToMap(next);
                            });
                    },
                    function () {
                    }
                )
            }
        });

        //save changes to db
        $scope.saveChangestoDb = function() {
            adminToShowProblemService.saveChangestoDbProblemDescription(problem, $scope.problem.Severity, $scope.problem.Content,$scope.problem.Proposal,$scope.problem.Title, $scope.checkedbox)
                .then(function() {
                    adminToShowProblemService.showScopeNotApprovedProblemFromList(problem);
                    $scope.editStatusClass = adminToShowProblemService.getEditStatus(3);
                    UserService.setSaveChangeStatus(true);
                });
        };

        //addproblemtoDB
        //TODO: Need to refactor
        $scope.addProblemToDB = function(){
            if(UserService.getSaveChangeStatus()){
                $scope.notApproved = adminToShowProblemService.deleteNotApprovedProblemFromList(problem);
                adminToShowProblemService.approveNotApprovedProblem(problem).then(function(){
                    if(adminToShowProblemService.getNotApprovedProblemListQty()){
                        adminToShowProblemService.showScopeNotApprovedProblemFromList($scope.notApproved[0]);
                    } else {
                        adminToShowProblemService.redirectToMap('#/map');
                        $scope.swipeHide();
                    }
                })
            }
        }

        //delete problem from DB
        $scope.deleteProblemFromDb = function(){
        //modal window
                var text = 'Будь ласка, підтвердіть видалення проблеми';
                var approveCaption = 'Видалити проблему';
                var cancelCaption = 'Скасувати';
                adminToShowProblemService.showModalMessage(text, 'sm',approveCaption, cancelCaption).then(
                    function () {
                        if ($scope.isAdministrator()) {
                            if (problemModerationStatus) {
                                adminToShowProblemService.deleteNotApprovedProblemDB(problem).then(function () {
                                    window.location.href = "#/map";
                                    $scope.swipeHide();
                                    $rootScope.getProblemsAndPlaceMarkers();
                                })
                            } else {
                                if (UserService.getSaveChangeStatus()) {
                                    $scope.notApproved = adminToShowProblemService.deleteNotApprovedProblemFromList(problem);
                                    adminToShowProblemService.deleteNotApprovedProblemDB(problem).then(function () {
                                        if (adminToShowProblemService.getNotApprovedProblemListQty()) {
                                            adminToShowProblemService.showScopeNotApprovedProblemFromList($scope.notApproved[0]);
                                        } else {
                                            adminToShowProblemService.redirectToMap('#/map');
                                            $scope.swipeHide();

                                        }
                                    })
                                }
                            }
                        }
                    },
                    function () {
                        return true;
                    }
                );
        };
    }]);

});
