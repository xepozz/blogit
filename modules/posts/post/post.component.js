angular
    .module('postModule')
    .component('post', {
        templateUrl: 'modules/posts/post/post.template.html',
        restrict: 'E',
        bindings: {
            post: '=',
        },
        controller: function PostController($sce, $routeParams) {
            this.$onInit = function () {
                this.post.body = $sce.trustAsHtml(marked(this.post.body))
            };
        }
    })

;
