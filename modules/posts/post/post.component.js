angular
    .module('postModule')
    .component('post', {
        templateUrl: 'modules/posts/post/post.template.html',
        bindings: {
            post: '=',
        },
        controller: function ($sce, PostRepository, $q, $routeParams) {
            this.commentsLoaded = false
            this.showSpinner = true
            this.loadComments = () => {
                this.commentsLoaded = true
            }
            this.likesCount = 0
            this.dislikesCount = 0

            this.$onInit = () => {
                $q
                    .resolve(PostRepository.getReactionCounters(this.post.id))
                    .then(result => {
                        this.likesCount = result.thumbUp
                        this.dislikesCount = result.thumbDown
                    });

                const shortDescription = this.post.body.substring(0, this.post.body.indexOf('<hr>'))

                if ($routeParams && $routeParams.id) {
                    this.post.body = $sce.trustAsHtml(this.post.body)
                } else {
                    this.post.body = $sce.trustAsHtml(shortDescription || this.post.body)
                }

                this.showSpinner = false

            };
        }
    })

;
