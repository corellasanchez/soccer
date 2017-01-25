(function() {
    'use strict';

    angular
        .module('app.team')
        .controller('TeamCtrl', TeamCtrl);

    TeamCtrl.$inject = ['TeamService', '$stateParams', '$state'];

    function TeamCtrl(TeamService, $stateParams, $state) {
        var vm = this;
        vm.favorite_teams = [];
        vm.sortType = 'pos';
        vm.sortReverse = false;
        vm.openModalTeam = openModalTeam;
        vm.openModalMatches = openModalMatches;

        activate();

        function activate() {
            vm.favorite_teams = TeamService.getFavoriteTeams();
            console.log(vm.favorite_teams);
        }

        function openModalTeam(team,isGroup) {
            TeamService.openModalTeam(team,isGroup);
        }

        function openModalMatches(team,isGroup) {
            TeamService.openModalMatches(team,isGroup);
        }
    }
})();
