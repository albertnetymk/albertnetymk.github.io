(function () {
  "use strict";

  var Theme = {};

  Theme.backToTop = {
    register: function () {
      var $backToTop = $('#back-to-top');

      $(window).scroll(function () {
        if($(window).scrollTop() > 100) {
          $backToTop.fadeIn(1000);
        } else {
          $backToTop.fadeOut(1000);
        }
      });

      $backToTop.click(function () {
        $('html').animate({ scrollTop: 0 });
      });
    }
  };

  Theme.codeCopy = {
    register: function () {
      $('.highlight').each(function () {
        var $highlight = $(this);
        var $codeBlock;
        var $button;

        if ($highlight.parent('.code-block').length) {
          return;
        }

        $highlight.wrap('<div class="code-block"></div>');
        $codeBlock = $highlight.parent();
        $button = $(
          '<button class="code-copy-button" type="button" title="Copy code" aria-label="Copy code">' +
            '<svg class="code-copy-icon code-copy-icon-copy" viewBox="0 0 20 20" aria-hidden="true">' +
              '<rect x="7" y="7" width="9" height="9" rx="1"></rect>' +
              '<path d="M5 13H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1"></path>' +
            '</svg>' +
            '<svg class="code-copy-icon code-copy-icon-check" viewBox="0 0 20 20" aria-hidden="true">' +
              '<path d="m4 10 4 4 8-9"></path>' +
            '</svg>' +
            '<span class="code-copy-label" aria-live="polite">Copy code</span>' +
          '</button>'
        );

        $button.click(function () {
          var lines = $highlight.find('.code .line').map(function () {
            return $(this).text();
          }).get();
          var code = lines.length ? lines.join('\n') : $highlight.find('.code pre').text();

          navigator.clipboard.writeText(code).then(function () {
            var resetTimer = $button.data('copy-reset-timer');

            window.clearTimeout(resetTimer);
            $button
              .addClass('is-copied')
              .attr('title', 'Copied')
              .attr('aria-label', 'Copied')
              .find('.code-copy-label').text('Copied');

            $button.data('copy-reset-timer', window.setTimeout(function () {
              $button
                .removeClass('is-copied')
                .attr('title', 'Copy code')
                .attr('aria-label', 'Copy code')
                .find('.code-copy-label').text('Copy code');
            }, 2000));
          });
        });

        $codeBlock.append($button);
      });
    }
  };

  Theme.fancybox = {
    register: function () {
      if ($.fancybox){
        $('.post').each(function () {
          $(this).find('img').each(function () {
            $(this).wrap('<a class="fancybox" href="' + this.src + '" title="' + this.alt + '"></a>')
          });
        });

        $('.fancybox').fancybox({
          openEffect	: 'elastic',
          closeEffect	: 'elastic'
        });
      }
    }
  };

  this.Theme = Theme;
}.call(this));
