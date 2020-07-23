/**
 * Application configuration
 */
angular
    .module('config', [])
    .config(function ($provide) {
        $provide.constant('BASE_API_URL', 'https://api.github.com/repos/xepozz/blogit')
        $provide.constant('DEBUG_ENABLED', true)
    })
;

/**
 * Bootstrap another dependencies
 */
marked.setOptions({
    highlight: function (code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        return hljs.highlight(validLanguage, code).value;
    },
    headerIds: true,
    headerPrefix: 'post-',
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: true
});