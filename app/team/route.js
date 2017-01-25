(function() {
    'use strict';

    angular
        .module('app.league')
        .config(setupRoutes);

    function setupRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider.state('favorite-teams', {
            url: '/favorite-teams',
            templateUrl: 'app/team/views/favorites.html',
            controller: 'TeamCtrl',
            controllerAs: 'vm'
        })

        $urlRouterProvider.otherwise("/");
      
    }
})();
