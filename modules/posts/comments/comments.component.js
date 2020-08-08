angular
    .module('commentsModule')
    .component('comments', {
        templateUrl: 'modules/posts/comments/comments.template.html',
        restrict: 'E',
        bindings: {
            post: '=',
        },
        controller: function ($q, $sce, $scope, CommentRepository, HtmlSanitizer) {
            this.comments = []
            this.showSpinner = true
            this.$onInit = function () {
                $q
                    .resolve(CommentRepository.getForPost(this.post.id))
                    .then(comments => {
                        this.comments = comments.map(comment => {
                            comment.body = $sce.trustAsHtml(
                                HtmlSanitizer.sanitize(comment.body)
                            )
                            return comment
                        })
                        this.showSpinner = false
                    })
            };
        }
    })
;