angular
    .module('authorizationModule')
    .component('authorization', {
        templateUrl: 'modules/authorization/authorization.template.html',
        restrict: 'E',
        controller: function ($localStorage, Base64Encoder) {
            this.token = ''
            this.isTokenStored = $localStorage.github && $localStorage.github.token

            this.storeToken = () => {
                $localStorage.github = {token: Base64Encoder.encode(this.token)}
            }
        }
    })
;