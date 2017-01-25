(function() {
    'use strict';

    angular
        .module('app.league')
        .config(setupRoutes);

    function setupRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider.state('league', {
            url: '/league/:leagueId',
            templateUrl: 'app/league/views/view.html',
            controller: 'LeagueCtrl',
            controllerAs: 'vm'
        })

        $urlRouterProvider.otherwise("/");
      
    }
})();
