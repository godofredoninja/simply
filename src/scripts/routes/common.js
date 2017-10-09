import Share from '../helper/share';
import followMe from '../helper/follow-me';

// Varibles
const $body = $('body');
const $pageUrl = $body.attr('data-page');
const $seachInput = $('#search-field');

/* Search Template */
const searchTemplate = `
  <a class="u-block" href="${$pageUrl}{{link}}">
    <span class="u-contentTitle u-fontSizeBase">{{title}}</span>
    <span class="u-block u-fontSizeSmaller u-textColorNormal u-paddingTop5">{{pubDate}}</span>
  </a>
`;


export default {
  init() {
    // Follow me
    if (typeof followSocialMedia !== 'undefined') {
      followMe(followSocialMedia); // eslint-disable-line
    }

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

    /* Search Open */
    $('.button-search--open').on('click', (e) => {
      e.preventDefault();
      $body.addClass('is-search');
      $seachInput.focus();
    });

    /* Search Close */
    $('.button-search--close').on('click', (e) => {
      e.preventDefault();
      $body.removeClass('is-search');
    });

    /* Search */
    $seachInput.ghostHunter({
      results: '#searchResults',
      zeroResultsInfo: true,
      info_template: '<p class="u-paddingBottom20 u-fontSize15">Showing {{amount}} results</p>',
      result_template: searchTemplate,
      onKeyUp: true,
    });

    /* rocket to the moon (retur TOP HOME) */
    $('.rocket').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, 250);
    });

    /* Share article in Social media */
    $('.simply-share').bind('click', function (e) {
      e.preventDefault();
      const share = new Share($(this));
      share.share();
    });

    /* sicky sidebar */
    $('.sidebar-sticky').theiaStickySidebar({
      additionalMarginTop: 30,
    });

    // show comments count of disqus
    if (typeof disqusShortName !== 'undefined') {
      $('.simply-disqus').removeClass('u-hide');
    }

    /* show btn for Retur TOP PAGE */
    setInterval( () => {
      ($(window).scrollTop() > 100) ? $('.rocket').removeClass('u-hide') : $('.rocket').addClass('u-hide');
    }, 250);

  }, //end => Finalize
};
