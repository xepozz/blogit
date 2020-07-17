angular
    .module('posts', ['postModule'])
    .component('posts', {
        templateUrl: 'modules/posts/posts.template.html',
        restrict: 'E',
        controller: function ($scope, $http, $q, PostRepository) {
            this.posts = [];
            this.canLoadNext = true
            this.currentPage = 0
            this.showSpinner = true

            this.availablePosts = {
                0: [1, 2],
                1: [],
            };

            this.loadNext = () => {
                this.showSpinner = true
                this.loadNextPage()
            }
            this.loadNextPage = function () {
                const posts = this.availablePosts[this.currentPage] ?? []

                console.log('Load page', this.currentPage, 'posts', posts)
                const promises = [];
                for (const id of posts) {
                    promises.push(PostRepository.loadPost(id))
                }
                $q
                    .all(promises)
                    .then(posts => {
                        console.log(posts)
                        const sortedPosts = posts.sort((a, b) => a.id > b.id)
                        this.posts.push(...sortedPosts)
                        this.showSpinner = false
                    })

                this.currentPage++
                this.canLoadNext = this.availablePosts.length !== this.posts.length
            }
            this.$onInit = () => {
                this.loadNextPage(this.currentPage)
            }
        }
    })
;