// Tags (from https://github.com/rfgamaral/ricardoamaral.net/blob/master/src/ssi/google-analytics.html)
    (function (document, trackingId) {
        if (navigator.userAgent.indexOf('Google Page Speed Insights' || 'Website Speed Test' ) === -1) {
            var gtagElement = document.createElement('script');
            gtagElement.src = 'https://www.googletagmanager.com/gtag/js?id=' + trackingId;
            gtagElement.async = true;
            var firstScriptElement = document.scripts[0];
            firstScriptElement.parentNode.insertBefore(gtagElement, firstScriptElement);
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', trackingId);
        }
    }(document, 'UA-109503488-2'));
