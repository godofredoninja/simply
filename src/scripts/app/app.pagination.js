/**
 * @package godofredoninja
 * pagination
 */
const $win = $(window);
const paginationUrl = $('link[rel=canonical]').attr('href');
const $btnLoadMore = $('.loadMore');
const $paginationTotal = $btnLoadMore.attr('data-page-total');

let enableDisableScroll = false; // false => !1
let paginationNumber = 2;

/* Page end */
function activeScroll() {
  enableDisableScroll = true; // true => !0
}

//  window scroll
$win.on('scroll', activeScroll);

/* Scroll page END */
function PageEnd() {
  const scrollTopWindow = $win.scrollTop() + window.innerHeight;
  const scrollTopBody = document.body.clientHeight - (window.innerHeight * 2);

  return (enableDisableScroll === true && scrollTopWindow > scrollTopBody);
}


$(document).on('ready', () => {
  // set interbal
  setInterval(() => {
    if (PageEnd()) {
      if (typeof $paginationTotal !== 'undefined' && paginationNumber <= $paginationTotal) {
        /* Call Ajax Get URL */
        $.ajax({
          type: 'GET',
          url: `${paginationUrl}page/${paginationNumber}`,
          beforeSend: () => {
            $win.off('scroll', activeScroll);
            $btnLoadMore.text('Loading...');
          },
          success: (data) => {
            const entries = $('.feed-entry-wrap', data);
            $('.feed-entry-content').append(entries);
            $btnLoadMore.html('Load more');

            paginationNumber += 1;

            $win.on('scroll', activeScroll);
          },
        });

        /* Disable scroll */
        enableDisableScroll = false; // => !1;
      } else {
        $btnLoadMore.remove();
      }
    }
  }, 500);

});
