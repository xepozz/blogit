angular
    .module('commentsModule')
    .component('comments', {
        templateUrl: 'modules/posts/comments/comments.template.html',
        restrict: 'E',
        bindings: {
            post: '=',
        },
        controller: function ($q, $sce, $scope, CommentRepository) {
            this.comments = []
            this.sanitizerConfig = {
                // FORBID_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr'],
                ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'br', 'p', 'code', 'span', 'pre'],
                FORBID_ATTR: ['style'],
                IN_PLACE: true
            }
            this.showSpinner = true
            this.$onInit = function () {
                $q
                    .resolve(CommentRepository.getForPost(this.post.id))
                    .then(comments => {
                        this.comments = comments.map(comment => {
                            comment.body = $sce.trustAsHtml(
                                DOMPurify.sanitize(
                                    marked(comment.body),
                                    this.sanitizerConfig
                                )
                            )
                            return comment
                        })
                        this.showSpinner = false
                    })
            };
        }
    })
;