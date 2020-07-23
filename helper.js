const sanitizerConfig = {
    // FORBID_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr'],
    ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'br', 'p', 'code', 'span', 'pre'],
    FORBID_ATTR: ['style'],
    IN_PLACE: true
}
angular
    .module('app')
    .factory('Base64Encoder', function () {
        return {
            encode: (value) => btoa(unescape(encodeURIComponent(value))),
            decode: (value) => decodeURIComponent(escape(atob(value))),
        }
    })
    .factory('HtmlSanitizer', function () {
        return {
            sanitize: (value) => DOMPurify.sanitize(value, sanitizerConfig)
        }
    })
;
Array.prototype.includesArray = function (array) {
    if (array.length > this.length) {
        return false
    }

    for (const index in array) {
        if (array.hasOwnProperty(index) && !this.includes(array[index])) {
            return false
        }
    }

    return true
}
