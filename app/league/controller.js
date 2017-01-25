(function() {
    'use strict';

    angular
        .module('app.league')
        .controller('LeagueCtrl', LeagueCtrl);

    LeagueCtrl.$inject = ['LeagueService', 'TeamService', '$stateParams', '$state'];

    function LeagueCtrl(LeagueService, TeamService, $stateParams, $state) {
        var vm = this;
        vm.league_details = [];
        vm.league_layout = "";
        vm.group_standings = [];
        vm.standing = [];
        vm.sortType = 'pos';
        vm.sortReverse = false;
        vm.openModalTeam = openModalTeam;
        vm.openModalMatches = openModalMatches;
        vm.addFavorite = addFavorite;

        activate();

        function activate() {
            LeagueService.getLeagueDetails()
                .then(handleleagueSuccess)
                .catch(handleleagueError);
        }

        function handleleagueSuccess(result) {
            vm.league_details = result.data;
            if (result.data.standings) {
                //transform result.data.standings in an array of objects
                angular.forEach(result.data.standings, function(value, key) {
                    vm.group_standings.push(value);
                });
                console.log(vm.group_standings);
                vm.league_layout = 'app/league/views/group_view.html';
            } else {
                vm.standing = result.data.standing;
                console.log(vm.standing);
                vm.league_layout = 'app/league/views/single_view.html';
            }
        }

        function handleleagueError(error) {
            console.log("An error occurred while loading league details", error);
            alert("An error occurred while loading league details: " + error.statusText);
            $state.go('dashboard');
        }

        function getPlayers(team_href) {
            TeamService.getTeamPlayers(team_href)
                .then(handleteamSuccess)
                .catch(handleteamError);
        }

        function openModalTeam(team, isGroup) {
            TeamService.openModalTeam(team, isGroup);
        }

        function openModalMatches(team, isGroup) {
            TeamService.openModalMatches(team, isGroup);
        }

        function addFavorite(team, isGroup) {
            TeamService.addFavoriteTeam(team, $stateParams.leagueId, vm.league_details.leagueCaption, isGroup );
        }
    }
})();
