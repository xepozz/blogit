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
    .factory('PromiseCacheService', function ($q, $log, $localStorage) {
        $log.debug('$localStorage:', $localStorage)

        function cloneResult(data) {
            if (Array.isArray(data)) {
                return data.map(item => cloneResult(item))
            }

            return Object.assign({}, data)
        }

        return {
            getOrSet: async (cacheKey, promiseInFunction) => {
                if ($localStorage[cacheKey]) {
                    $log.debug('Cache hit detected', cacheKey)
                    return $q.resolve(Object.assign({}, $localStorage[cacheKey]))
                }
                $log.debug('No cache hit detected', cacheKey)
                const promise = promiseInFunction();
                const result = await promise;
                $localStorage[cacheKey] = cloneResult(result)
                return promise
            }
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
