angular
    .module('postModule')
    .component('post', {
        templateUrl: 'modules/posts/post/post.template.html',
        restrict: 'E',
        bindings: {
            post: '=',
        },
        controller: function ($sce) {
            this.commentsLoaded = false
            this.showSpinner = true
            this.loadComments = () => {
                this.commentsLoaded = true
            }
            this.$onInit = () => {
                this.post.body = $sce.trustAsHtml(marked(this.post.body))
                this.showSpinner = false
            };
        }
    })

;
