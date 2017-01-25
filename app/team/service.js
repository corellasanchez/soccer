(function() {
    'use strict';

    angular
        .module('app.team')
        .service('TeamService', TeamService);

    TeamService.$inject = ['$http', 'env', '$stateParams', '$uibModal'];

    function TeamService($http, env, $stateParams, $uibModal) {
        var service = this;
        service.getTeamPlayers = getTeamPlayers;
        service.getTeamMatches = getTeamMatches;
        service.favoriteTeams = [];
        service.addFavoriteTeam = addFavoriteTeam;
        service.getFavoriteTeams = getFavoriteTeams;
        service.openModalTeam = openModalTeam;
        service.openModalMatches = openModalMatches;
        service.team_players = [];
        service.team_matches = [];
        service.modal = {};

        function getTeamPlayers(team_href) {
            return $http.get(team_href + '/players', { headers: { 'X-Auth-Token': env.apiKey } });
        }

        function getTeamMatches(team_href) {
            return $http.get(team_href + '/fixtures', { headers: { 'X-Auth-Token': env.apiKey } });
        }

        function addFavoriteTeam(team, leagueId, leagueName, isGroup) {
            var alreadyAdded = false;
            
            team.leagueId = leagueId;
            team.leagueName = leagueName;
            team.isGroup = isGroup;

            service.favoriteTeams.forEach(function(favorite_team) {
                
                if (isGroup) {
                    if(favorite_team.team == team.team){
                     alreadyAdded = true;   
                    }
                } else {
                    if(favorite_team.teamName == team.teamName){
                     alreadyAdded = true;   
                    }
                }

            });
            if (!alreadyAdded) {
                service.favoriteTeams.push(team);
                service.modal = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/team/views/modal_confirm.html',
                    size: 'md',
                    controller: function($scope) {
                        $scope.team = team;
                        $scope.cancel = function() {
                            service.modal.close();
                        };
                    }
                });
            }
        }

        function getFavoriteTeams() {
            return service.favoriteTeams;
        }


        function calculateAge(dateOfBirth) {
            var currentYear = new Date().getFullYear();
            var yearOfBirth = new Date(dateOfBirth).getFullYear()
            return currentYear - yearOfBirth;
        }

        function openModalTeam(team, isGroup) {
            var url = "";
            if (isGroup) {
                url = env.apiUrl + 'teams/' + team.teamId
            } else {
                url = team._links.team.href;
            }
            getTeamPlayers(url)
                .then(function(result) {
                    service.team_players = result.data;
                    service.team_players.players.forEach(function(player) {
                        player.age = calculateAge(player.dateOfBirth);
                    });

                    service.modal = $uibModal.open({
                        animation: true,
                        templateUrl: 'app/team/views/modal_details.html',
                        size: 'lg',
                        controller: function($scope) {
                            $scope.sortType = 'name';
                            $scope.sortReverse = false;
                            $scope.team = team;
                            $scope.team_players = service.team_players;
                            $scope.cancel = function() {
                                service.modal.close();
                            };
                        }
                    });
                });
        }

        function openModalMatches(team, isGroup) {
            var url = "";
            if (isGroup) {
                url = env.apiUrl + 'teams/' + team.teamId
            } else {
                url = team._links.team.href;
            }
            getTeamMatches(url)
                .then(function(result) {
                    service.team_matches = result.data;
                    service.modal = $uibModal.open({
                        animation: true,
                        templateUrl: 'app/team/views/modal_fixtures.html',
                        size: 'lg',
                        controller: function($scope) {
                            $scope.sortType = 'date';
                            $scope.sortReverse = true;
                            $scope.team = team;
                            $scope.team_matches = service.team_matches;
                            $scope.cancel = function() {
                                service.modal.close();
                            };
                        }
                    });
                });
        }

    }

})();
