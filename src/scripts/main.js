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


/* Menu open and close for mobile */
$('.button-nav--toggle').on('click', (e) => {
  e.preventDefault();
  $('body').toggleClass('is-showNavMob');
});



$doc.on('ready', () => {
  /* Video Responsive*/
  Simply.videoResponsive($postBody);
});
