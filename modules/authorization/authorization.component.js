angular
    .module('authorizationModule')
    .component('authorization', {
        templateUrl: 'modules/authorization/authorization.template.html',
        restrict: 'E',
        controller: function ($localStorage) {
            this.token = ''
            this.isTokenStored = $localStorage.github && $localStorage.github.token

            this.storeToken = () => {
                $localStorage.github = {token: btoa(this.token)}
            }
        }
    })
;