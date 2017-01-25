(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .config(setupRoutes);

    function setupRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider.state('dashboard', {
            url: '/',
            templateUrl: 'app/dashboard/view.html',
            controller: 'DashboardCtrl',
            controllerAs: 'vm'
        })

        $urlRouterProvider.otherwise("/");
      
    }
})();
