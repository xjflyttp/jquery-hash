/**
 * @author xjflyttp <xjflyttp@gmail.com>
 * @example
 * $.hash.get('abc');
 * $.hash.set('abc', 'value');
 * $.hash.getParamsObject();
 * $.hash.getParamsString();
 */
(function ($) {
    var undefined;
    var params = {};

    function getHashFromLocation() {
        return window.location.hash.replace(/^#/, '');
    }

    function setHashToLocation() {
        var hashString = getHashFromParams();
        if (hashString.length === 0) {
            return;
        }
        hashString = '#' + hashString;
        window.location.hash = hashString;
    }

    function hashToObejct() {
        var hashStr = getHashFromLocation();
        var params = {};
        var hashArray = hashStr.split("&");
        if (hashStr.length === 0 || hashArray.length === 0) {
            return params;
        }
        for (var index in hashArray) {
            var paramStr = hashArray[index];
            var paramArray = paramStr.split("=");
            if (paramArray.length === 2) {
                var key = paramArray[0];
                var value = paramArray[1];
                params[key] = value;
            }
        }
        return params;
    }

    function getHashFromParams() {
        var hashString = '';
        if (params.length === 0) {
            return hashString;
        }
        for (var key in params) {
            var value = params[key];
            hashString += '&' + key + '=' + value;
        }
        hashString = hashString.substr(1);
        return hashString;
    }

    //init set hash to params
    params = hashToObejct();

    $.hash = {
        get: function (name) {
            return params[name] === undefined ? undefined : params[name];
        },
        set: function (name, value) {
            params[name] = value;
            setHashToLocation();
            return this;
        },
        /**
         * {
         * a: 1,
         * b: 2
         * }
         * @returns Object
         */
        getParamsObject: function () {
            return params;
        },
        /**
         * a=1&b=2
         * @returns string
         */
        getParamsString: function () {
            return getHashFromParams();
        }
    };

})(jQuery);