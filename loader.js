(function(root) {
    'use strict';

    function isJavascript(url) {
        var ext;

        url = url.toLowerCase();
        ext = url.substr(url.lastIndexOf('.') + 1);
        if (ext === 'js') {
            return true;
        }

        return false;
    }

    var loader = {
        load: function(url, callback) {
            var node;
            var isJs = isJavascript(url);

            if (isJs) {
                node = document.createElement('script');
                node.type = 'text/javascript';
                node.async = true;
                node.src = url;
            } else {
                node = document.createElement("link");
                node.setAttribute("type", "text/css");
                node.setAttribute("rel", "stylesheet");
                node.setAttribute("href", url);
            }

            document.getElementsByTagName("head")[0].appendChild(node);

            var supportOnload = "onload" in node;

            if (supportOnload) {
                node.onload = onload
            } else {
                node.onreadystatechange = function() {
                    if (/loaded|complete/.test(node.readyState)) {
                        onload()
                    }
                }
            }

            function onload() {
                // Ensure only run once and handle memory leak in IE
                node.onload = node.onerror = node.onreadystatechange = null

                callback()
            }
        }
    }

    root.loader = loader;
    
})(window);
