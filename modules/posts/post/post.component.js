angular
    .module('postModule')
    .component('post', {
        templateUrl: 'modules/posts/post/post.template.html',
        bindings: {
            post: '=',
        },
        controller: function ($sce, PostRepository, $q) {
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

                this.post.body = $sce.trustAsHtml(this.post.body)
                this.showSpinner = false
            };
        }
    })

;
