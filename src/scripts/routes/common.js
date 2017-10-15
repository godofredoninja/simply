import simplyShare from '../app/app.share';
import simplyFollow from '../app/app.follow';
import simplySearch from '../app/app.search';

// Varibles
const $body = $('body');
const $blogUrl = $body.attr('data-page');
const $seachInput = $('#search-field');

export default {
  init() {
    // Follow me
    if (typeof followSocialMedia !== 'undefined') simplyFollow(followSocialMedia); // eslint-disable-line

    /* Lazy load for image */
    $('.cover-lazy.lazy').lazyload({effect : 'fadeIn'});
    $('.simply-lazy.lazy').lazyload({threshold : 200});
  }, // end Init

  finalize() {
    /* Menu open and close for mobile */
    $('.button-nav--toggle').on('click', (e) => {
      e.preventDefault();
      $body.toggleClass('is-showNavMob');
    });

    /* rocket to the moon (retur TOP HOME) */
    $('.rocket').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, 250);
    });

    /* Share article in Social media */
    $('.simply-share').bind('click', function (e) {
      e.preventDefault();
      const share = new simplyShare($(this));
      share.share();
    });

    /* sicky sidebar */
    $('.sidebar-sticky').theiaStickySidebar({additionalMarginTop: 30});

    // show comments count of disqus
    if (typeof disqusShortName !== 'undefined') $('.simply-disqus').removeClass('u-hide');

    // Search
    simplySearch($seachInput, $blogUrl);

    /* show btn for Retur TOP PAGE */
    setInterval( () => {
      ($(window).scrollTop() > 100) ? $('.rocket').removeClass('u-hide') : $('.rocket').addClass('u-hide');
    }, 250);

  }, //end => Finalize
};
