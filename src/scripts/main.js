/**
 * @package GodoFredoNinja
 * JavaScript functions
 */

// import external dependencies
import 'sticky-kit/dist/sticky-kit';
import Prism from 'prismjs';
import 'prismjs/plugins/autoloader/prism-autoloader';
// import 'lunr';
import './lib/jquery.ghostHunter';

// import local dependencies
import Simply from './app/app.helper';
import SimplyShare from './app/app.share';
import './app/app.pagination';

// Variables
const $doc = $(document);
const $win = $(window);

const $pageUrl = $('body').attr('data-page');
const $postBody = $('.post-body');
const $shareCount = $('.share-count');
const $share = $('.simply-share');
const $postActions = $('.postActions');
const $header = $('.header');
const $followBox = $('.follow-box');
const $featuredPost = $('.featured');
const $comments = $('.post-comments');
const $videoPostFormat = $('.video-post-format');
const $seachInput = $('#search-field');

const urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/; // eslint-disable-line


/* Menu open and close for mobile */
$('.button-nav--toggle').on('click', (e) => {
  e.preventDefault();
  $('body').toggleClass('is-showNavMob');
});

/* Search Open */
$('.button-search--open').on('click', (e) => {
  e.preventDefault();
  $('body').addClass('is-search');
  $seachInput.focus();
});

/* Search Close */
$('.button-search--close').on('click', (e) => {
  e.preventDefault();
  $('body').removeClass('is-search');
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


$doc.on('ready', () => {
  /** Follow social media */
  if (typeof followSocialMedia !== 'undefined') Simply.followMe(followSocialMedia, $followBox, urlRegexp); // eslint-disable-line

  /* Featured Post Animation */
  // if ($featuredPost.find('.entry').hover(function() {$featuredPost.find('.entry').removeClass('first'), $(this).addClass('first')}));

  /* Video Post Format */
  if ($videoPostFormat.length > 0 ){
     const video = $('iframe[src*="youtube.com"]')[0];
    $videoPostFormat.find('.video-responsive').prepend(video);
  }

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

  /* Prism code syntax autoloader */
  Prism.plugins.autoloader.languages_path = '../assets/scripts/prism-components/';
});


$win.on('scroll', function () {
    const scrollTop = $(this).scrollTop();
    const heightPostBody = $postBody.height();

    // active or desactive Post Actions in post Sections
    if (scrollTop < heightPostBody) {
      $postActions.addClass('is-visible');
    } else {
      $postActions.removeClass('is-visible');
    }
});
