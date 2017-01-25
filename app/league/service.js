(function() {
    'use strict';

    angular
        .module('app.league')
        .service('LeagueService', LeagueService);

    LeagueService.$inject = ['$http', 'env', '$stateParams'];

    function LeagueService($http, env, $stateParams) {
        var service = this;
        service.getLeagueDetails = getLeagueDetails;

        function getLeagueDetails() {
            return $http.get(env.apiUrl + 'competitions/' + $stateParams.leagueId + '/leagueTable', { headers: { 'X-Auth-Token': env.apiKey } });
        }

    }

})();
