(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .service('DashboardService', DashboardService);

    DashboardService.$inject = ['$http', 'env'];

    function DashboardService($http, env) {
        var service = this;
        service.getLeagues = getLeagues;

        function getLeagues() {
            return $http.get(env.apiUrl + 'competitions/', { headers: { 'X-Auth-Token': env.apiKey } });
        }
    }

})();
