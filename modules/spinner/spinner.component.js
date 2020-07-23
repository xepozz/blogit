angular
    .module('spinnerModule')
    .component('spinner', {
        templateUrl: 'modules/spinner/spinner.template.html',
        bindings: {
            showSpinner: '=',
        },
        controller: function ($scope) {
            this.showSpinner = $scope.showSpinner
        }
    })
;