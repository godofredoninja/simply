/**
 * @package GodoFredoNinja
 * JavaScript functions
 */

// import external dependencies
import 'sticky-kit/dist/sticky-kit';

// import local dependencies
import Simply from './app/app.helper';
import SimplyShare from './app/app.share';
// import './app/app.pagination';

// Variables
const $doc = $(document);
const $win = $(window);

const $postBody = $('.post-body');
const $shareCount = $('.share-count');
const $share = $('.simply-share');
const $postActions = $('.postActions');
const $header = $('.header');
const $followBox = $('.follow-box');
const $featuredPost = $('.featured');

const urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/; // eslint-disable-line


/* Menu open and close for mobile */
$('.button-nav--toggle').on('click', (e) => {
  e.preventDefault();
  $('body').toggleClass('is-showNavMob');
});

/* Save Post in facebook*/
$('.fbSave').on('click', function (e) {
  e.stopPropagation();
  $(this).find('.fbSave-dropdown').toggleClass('is-visible');
  $doc.one('click', () => $(this).find('.fbSave-dropdown').toggleClass('is-visible'));
});

$doc.on('ready', () => {
  /** Follow social media */
  if (typeof followSocialMedia !== 'undefined') Simply.followMe(followSocialMedia, $followBox, urlRegexp); // eslint-disable-line

  /* Featured Post Animation */
  if ($featuredPost.find('.entry').hover(function() {$featuredPost.find('.entry').removeClass('first'), $(this).addClass('first')}));

  /* Video Responsive*/
  Simply.videoResponsive($postBody);

  /** Share Count in facebook */
  Simply.facebookShareCount($shareCount);

  /* Share article in Social media */
  $share.bind('click', function (e) {
    e.preventDefault();
    const share = new SimplyShare($(this));
    share.share();
  });

  /** sticky for Share Post and sidebar sticky */
  $('.sharePost, .sidebar-sticky').stick_in_parent({
    offset_top: 30,
  })
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
