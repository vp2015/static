/*jslint
 indent: 2,
 white: true
 */
/*globals jQuery, $ */
(function() {
  "use strict";

  var root = this;
  root.GOVUK = root.GOVUK || {};
  var GOVUK = root.GOVUK;

  GOVUK.TrackExternalLinks = function() {
    function getQueryParam(oldURL, key) {
      if (oldURL === "") return {};
      var params = {};
      for (var i = 0, l=oldURL.length; i < l; ++i) {
        var p = oldURL[i].split('=');
        if (p.length != 2) continue;
        params[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
      return params[key];
    }

    function rewriteExternalLink($element) {
      // expects a jQuery object
      var currentURL = $element.attr('href'),
          targetURL = getQueryParam(currentURL.search, 'url');
      $element.click(function(event) {
        // rewrite the @href at click time
        $(this).href = targetURL;
      });
    }

    return {
      init: function() {
        // links that start with "/g?url=" are 'external'
        var $externalLinks = $("a[href^='/g?url=']");

        if ($externalLinks.length > 0) {
          $externalLinks.each(function(_, $element) {
            rewriteExternalLink($element);
          });
        }
      }
    }
  };

  $(GOVUK.TrackExternalLinks.init);
}).call(this);
