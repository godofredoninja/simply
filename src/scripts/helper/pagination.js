/**
 * @package godofredoninja
 * pagination
 */

(function () {
  const $win = $(window);
  const $pathname = $('link[rel=canonical]').attr('href');
  const $btnLoadMore = $('.loadMore');
  const $maxPages = $btnLoadMore.attr('data-page-total');

  let scrollTime = false;
  let currentPage = 2;

  let lastScroll = 0;

  /* active Scroll */
  let onScroll = () => scrollTime = true;


  /* Scroll page END */
  let  detectPageEnd = () => {
    const scrollTopWindow = $win.scrollTop() + window.innerHeight;
    const scrollTopBody = document.body.clientHeight - (window.innerHeight * 2);

    return (scrollTime === true && scrollTopWindow > scrollTopBody);
  }

  /* Fetch Page */
  function fetchPage () {
    if (typeof $maxPages !== 'undefined' && currentPage <= $maxPages && detectPageEnd()) {
      $.ajax({
        type: 'GET',
        url: `${$pathname}page/${currentPage}`,
        dataType: 'html',
        beforeSend: () => {
          $win.off('scroll', onScroll);
          $('body').addClass('is-loading');
          $btnLoadMore.text('Loading...');
        },
        success: (data) => {
          const entries = $('.feed-entry-wrap', data);
          $('.feed-entry-content').append(entries);
          $btnLoadMore.html('Load more');

          currentPage ++;

          /* Lazy load for image */
          $('.simply-lazy.lazy').lazyload({ threshold : 200 });

          $win.on('scroll', onScroll);
        },
        complete: () => {
          setTimeout(() => {$('body').removeClass('is-loading')}, 700);

          // Disqus Update Count
          if (typeof disqusShortName !== 'undefined') {
            $('.simply-disqus').removeClass('u-hide');
            if (typeof DISQUSWIDGETS !== 'undefined') {
              DISQUSWIDGETS.getCount({reset: true}); // eslint-disable-line
            }
          }

        },

      });

      /* Disable scroll */
      scrollTime = false;
    } else {
      $btnLoadMore.remove();
    }
  }

  /* Is visble next page */
  function isVisible(element) {
    const scroll_pos = $win.scrollTop();
    const windowHeight = $win.height();
    const elementTop = $(element).offset().top;
    const elementHeight = $(element).height();
    const elementBottom = elementTop + elementHeight;
    return ((elementBottom - elementHeight * 0.25 > scroll_pos) && (elementTop < (scroll_pos + 0.5 * windowHeight)));
  }

  function historyReplaceState () {
    if ($btnLoadMore.length > 0) {
      const scroll = $win.scrollTop();

      if (Math.abs(scroll - lastScroll) > $win.height() * 0.1) {
        lastScroll = scroll;

        $('.feed-entry-wrap').each(function () {
          if (isVisible($(this))) {
            history.replaceState(null, null, $(this).attr("data-page"));
            return (false);
          }
        });
      }
    }
  }

  //  window scroll
  $win.on('scroll', onScroll);

  // set interbal
  setInterval(() => {
    fetchPage();
    historyReplaceState();
  }, 500);

})();
