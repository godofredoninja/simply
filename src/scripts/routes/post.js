import mediaEmbedResponsive from '../helper/video';
import facebookShareCount from '../helper/facebook-share-count';
import instagramFeed from '../helper/instagram-feed';

// post action variables
// const $postActions = $('.postActions');

// let postActionScrollTimeOut = true;
// let postActionLastPos = 0;
// let postActionPos = 0;
// let PostActionPosDelta = 5;

// Function for show post action in post footer
// function setPostActionsClass () {
//   const PostBodyHeight = $('.post-body').outerHeight();

//   postActionScrollTimeOut = false;
//   postActionPos = $(window).scrollTop();

//   if (postActionPos < PostBodyHeight) {
//     if (Math.abs(postActionLastPos - postActionPos) >= PostActionPosDelta) {
//       if (postActionPos > postActionLastPos && postActionPos > $postActions.outerHeight()) {
//         $postActions.addClass('is-visible');
//       } else {
//         $postActions.removeClass('is-visible');
//       }
//       postActionLastPos = postActionPos;
//     }
//   } else {
//     $postActions.removeClass('is-visible');
//   }
// }



export default {
  init() {
    // Embed Video Post Format (Media Embed)
    mediaEmbedResponsive();
  },
  finalize() {
    // Add data action zoom FOR IMG
    $('.post-body').find('img').attr('data-action', 'zoom');

    // Share Count
    facebookShareCount($('.share-count'));

    // sticky share post in left
    $('.sharePost').theiaStickySidebar({
      additionalMarginTop: 30,
    });

    // newsletter title change
    if (typeof newsletterTitle !== 'undefined') {
      $('.newsletter-title').html(newsletterTitle); // eslint-disable-line
    }

    // newsletter Description
    if (typeof newsletterDescription !== 'undefined') {
      $('.newsletter-description').html(newsletterDescription); // eslint-disable-line
    }

    // Instagram Feed
    if (typeof instagramUserId !== 'undefined' && typeof instagramToken !== 'undefined' && typeof instagramUserName !== 'undefined') {
      instagramFeed(instagramUserId, instagramToken, instagramUserName); // eslint-disable-line
    }

    // enable scroll time
    // $(window).on('scroll', () => postActionScrollTimeOut = true);

    // show and hide post actions
    // setInterval( () => { if (postActionScrollTimeOut) setPostActionsClass() }, 250);

    /* Prism autoloader */
    Prism.plugins.autoloader.languages_path = `${$('body').attr('data-page')}/assets/scripts/prism-components/`; // eslint-disable-line
  }, // end finalize
};
