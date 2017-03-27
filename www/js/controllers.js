angular.module('starter.controllers', ['nvd3'])


    .controller('DashCtrl', function ($scope) { })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('HomeCtrl', function ($scope, $stateParams, Chats) {

    })
    .controller('TestCtrl', function ($scope, $stateParams, Chats) {
        $scope.userAnswerList = [];
        $scope.save = function (Answer) {
            $scope.userAnswerList.push(Answer);
        };

    })

    .controller('ResultCtrl', function ($scope, $stateParams, Chats) {
        $scope.getResult = function(){
            var correctResult = 0;
            for(var i=0; i< $scope.userAnswerList.length(); i++){
                if($scope.userAnswerList[i] == 1)
                    correctResult = correctResult + 1;
                else
                    correctResult = correctResult;
            }
            alert(correctResult);
        };
    })

    .controller('GraphCtrl', function ($scope, $stateParams, $http) {
        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function (d) {
                    return d.province;
                },
                y: function (d) {
                    return d.transfer;
                },
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };
        var sUrl = "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";

        $http.get(sUrl).then(function (oData) {
            var aKeys = Object.keys(oData.data.gtf);
            $scope.data = new Array();
            for (var n = 0; n < aKeys.length; n++) {
                if (oData.data.gtf[aKeys[n]].hasOwnProperty("total")) {
                    $scope.data.push({ "province": aKeys[n], "transfer": oData.data.gtf[aKeys[n]].total });
                }
            }

        });


    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
