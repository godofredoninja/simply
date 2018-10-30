import simplyShare from './app.share';

(function ($) {
  // variables
  const $win = $(window);
  const $body = $('body');
  const $nav = $('.nav.has-sticky');
  const $shareBox = $('.sr-wrap');
  const intersectSels = ['.kg-width-full', '.kg-width-wide'];

  let observe = [];
  let didScroll = false;
  let lastScrollTop = 0;
  let lastScroll = 0;
  let delta = 5;

  $(intersectSels.join(',')).map(function () {
    observe.push(this);
  });

  /**
   * Dpcument Ready
   */
  $( document ).ready(function() {
    /* Menu open and close for mobile */
    $('.menu-toggle').on('click', e => {
      e.preventDefault();
      $body.toggleClass('is-showNavMob');
    });

    /* Search Open */
    $('.search-toggle').on('click', e => {
      e.preventDefault();
      $body.addClass('is-search').removeClass('is-showNavMob');
    });

    /* Search Close */
    $('.search-close').on('click', e => {
      e.preventDefault();
      $body.removeClass('is-search');
    })

    /* Share article in Social media */
    $('.simply-share').bind('click', function (e) {
      e.preventDefault();
      const share = new simplyShare($(this));
      share.share();
    });

    /* rocket to the moon (retur TOP HOME) */
    $('.rocket').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, 250);
    });

    /* scroll link width click (ID)*/
    $('.scroll-id').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 60 }, 500, 'linear');
    });
  });

  /**
   * Intersect share and image
   */
  const intersects = (el1, el2) => {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return !(rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.bottom < rect2.top || rect1.left > rect2.right);
  }

  /**
   * the floating fade sharing
   */
  function shareFadeHiden () {
    if( $win.width() < 768 ){ return false }

    const ele = $shareBox.get(0);
    let isHidden = false;

    for( let i in observe) {
      if( intersects( ele, observe[i]) ) {
        isHidden = true;
        break;
      }
    }

    (isHidden ? $shareBox.addClass('is-hidden') : $shareBox.removeClass('is-hidden'));
  }

  // functions that are activated when scrolling
  function hasScrolled () {
    const st = $win.scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta) { return false }

    // Scroll down and Scroll up
    if (lastScroll <= st) {
      // Scroll Down
      $nav.addClass('nav-up');
      lastScroll = st;
    } else {
      // Scroll UP
      $nav.removeClass('nav-up');
      lastScroll = st;
    }

    // show background and transparency
    // in header when page have cover image
    if (st >= 200) {
      $('body.has-cover').removeClass('is-transparent');
    } else {
      $('body.has-cover').addClass('is-transparent');
    }

    /**
     * Show and hide
     * => rocket for come back Top
     */
    if (st > 100) {
      $('.rocket').removeClass('u-hide');
    } else {
      $('.rocket').addClass('u-hide');
    }

    /* Show Post action in post page */
    if (st > 150) {
      $('.pa').addClass('is-visible');
    } else {
      $('.pa').removeClass('is-visible');
    }

    // Share Fade
    if (observe.length) { shareFadeHiden() }

    lastScrollTop = st;
  }

  $win.on('scroll', () => didScroll = true );

  /**
   * Set Interbal
   */
  setInterval(() => {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);


})(jQuery);

