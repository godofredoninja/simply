/**
 * @package GodoFredoNinja
 * JavaScript functions
 */

// import external dependencies
import 'sticky-kit/dist/sticky-kit';
import Prism from 'prismjs';
import 'prismjs/plugins/autoloader/prism-autoloader';
import 'jquery-lazyload';

import './lib/zoom';
import './lib/transition';
import './lib/jquery.ghostHunter';

// import local dependencies
import Simply from './app/app.helper';
import SimplyShare from './app/app.share';
import './app/app.pagination';

// Variables
const $doc = $(document);
const $win = $(window);

const $body = $('body');
const $pageUrl = $body.attr('data-page');
const $postBody = $('.post-body');
const $shareCount = $('.share-count');
const $share = $('.simply-share');
const $postActions = $('.postActions');
const $followBox = $('.follow-box');
const $comments = $('.post-comments');
const $videoPostBox = $('.video-post-format');
const $seachInput = $('#search-field');
// const $mainMenu = $('.mainMenu');

const urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/; // eslint-disable-line

// const mainMenuOffsetTop = $mainMenu.offset().top;
const postActionsHeight = $postActions.outerHeight();

let scrollTimeOut = true;
let lastYPos = 0;
let yPos = 0;
let yPosDelta = 5;

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

/* Save Post in facebook*/
$('.fbSave').on('click', function (e) {
  e.stopPropagation();
  $(this).find('.fbSave-dropdown').toggleClass('is-visible');
  $doc.one('click', () => $(this).find('.fbSave-dropdown').toggleClass('is-visible'));
});

/* scroll link width click (ID)*/
$('.scroll-id').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 50 }, 500, 'linear');
});


/* Disqus Comments */
function disqusComments(shortname) {
  const dsq = document.createElement('script');
  dsq.type = 'text/javascript';
  dsq.async = true;
  dsq.src = `//${shortname}.disqus.com/embed.js`;
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
}

/** show and hidePost Actions in footer of post */
function setPostActionsClass () {
  const heightPostBody = $postBody.outerHeight();
  const headerheight = $('.header').outerHeight();

  scrollTimeOut = false;
  yPos = $win.scrollTop();

  if (yPos < (heightPostBody+headerheight)){
    if (Math.abs(lastYPos - yPos) >= yPosDelta) {
      if (yPos > lastYPos && yPos > postActionsHeight) {
        $postActions.addClass('is-visible');
      } else {
        $postActions.removeClass('is-visible');
      }
      lastYPos = yPos;
    }
  } else {
    $postActions.addClass('is-visible')
  }
}


/* Video Post Format */
function videoPostFormat() {
  const video = $('iframe[src*="youtube.com"]')[0];
  $videoPostBox.find('.video-responsive').prepend(video);

  if (typeof youtubeChannel !== 'undefined') {
    $.each(youtubeChannel, (channelName, channelId) => { // eslint-disable-line
      $('.channel-name').removeClass('u-hide').prepend(`<span class="u-paddingRight20">Subscribe to ${channelName}</span>`);
      $('.g-ytsubscribe').attr('data-channelid', channelId);
    });

    const go = document.createElement('script');
    go.type = 'text/javascript';
    go.async = true;
    go.src = 'https://apis.google.com/js/platform.js';
    // document.body.appendChild(go);
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(go, s);
  }
}

/* enable scroll time */
$win.on('scroll', () => scrollTimeOut = true);

$doc.on('ready', () => {
  /** Follow social media */
  if (typeof followSocialMedia !== 'undefined') Simply.followMe(followSocialMedia, $followBox, urlRegexp); // eslint-disable-line

  /* Featured Post Animation */
  // if ($featuredPost.find('.entry').hover(function() {$featuredPost.find('.entry').removeClass('first'), $(this).addClass('first')}));

  /* add atribute for Zoom img */
  $postBody.find('img').attr('data-action', 'zoom');

  /* Video Post Format */
  if ($videoPostBox.length > 0) videoPostFormat();

  /** Share Count in facebook */
  Simply.facebookShareCount($shareCount);

  /* Share article in Social media */
  $share.bind('click', function (e) {
    e.preventDefault();
    const share = new SimplyShare($(this));
    share.share();
  });

  /* Video Responsive*/
  Simply.videoResponsive($postBody);

  /* Disqys Comments */
  if (typeof disqusShortName !== 'undefined' && $comments.length > 0) disqusComments(disqusShortName); // eslint-disable-line

  /** sticky for Share Post and sidebar sticky */
  $('.sharePost, .sidebar-sticky').stick_in_parent({
    offset_top: 30,
  });

   /* Search Template */
  const searchTemplate = `
    <a class="u-block" href="${$pageUrl}{{link}}">
      <span class="u-contentTitle u-fontSizeBase">{{title}}</span>
      <span class="u-block u-fontSizeSmaller u-textColorNormal u-paddingTop5">{{pubDate}}</span>
    </a>`;

  /* Search */
  $seachInput.ghostHunter({
      results: '#searchResults',
      zeroResultsInfo: true,
      info_template: '<p class="u-paddingBottom20 u-fontSize15">Showing {{amount}} results</p>',
      result_template: searchTemplate,
      onKeyUp: true,
    });

  /* rocket to the moon */
  $('.rocket').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0}, 250);
  });

  /* Lazy load for image */
  $('.simply-lazy.lazy').lazyload({threshold : 200});
  $('.cover-lazy.lazy').lazyload({ effect : 'fadeIn'});

  setInterval( () => {
    /* Called the function setPostActionsClass */
    if (scrollTimeOut) setPostActionsClass();

    /* show btn SctrollTop */
    ($win.scrollTop() > 100) ? $('.rocket').removeClass('u-hide') : $('.rocket').addClass('u-hide');
  }, 250);

  /* Prism code syntax autoloader */
  Prism.plugins.autoloader.languages_path = '../assets/scripts/prism-components/';
});



// $win.on('scroll', function () {
//   const winScrollTop = $(this).scrollTop();
//   (winScrollTop >= mainMenuOffsetTop) ? $mainMenu.addClass('mainMenu--affixed') : $mainMenu.removeClass('mainMenu--affixed');
// });
