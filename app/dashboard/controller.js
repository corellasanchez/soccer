(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['DashboardService', '$stateParams'];

    function DashboardCtrl(DashboardService, $stateParams) {
        var vm = this;
        vm.leagues = [];

        activate(DashboardService);

        function activate() {
            DashboardService.getLeagues()
                .then(handleSuccess)
                .catch(handleError);
        }

        function handleSuccess(result) {
          vm.leagues = result.data;
        }

        function handleError(error) {
            console.log("An error occurred while loading leagues",error);
        }
    }

})();
