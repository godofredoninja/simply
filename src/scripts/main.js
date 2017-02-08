/**
 * @package GodoFredoNinja
 * JavaScript functions
 */

// import external dependencies
// import 'sticky-kit/dist/sticky-kit';

// import local dependencies
import Simply from './app/app.helper';
// import SimplyShare from './app/app.share';
// import './app/app.pagination';

// Variables
const $doc = $(document);
// const $win = $(window);

const $postBody = $('.post-body');
const $shareCount = $('.share-count');


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
  /* Video Responsive*/
  Simply.videoResponsive($postBody);

  /** Share Count in facebook */
  Simply.facebookShareCount($shareCount);
});
