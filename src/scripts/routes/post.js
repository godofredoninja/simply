import mediaEmbedResponsive from '../helper/video';
import facebookShareCount from '../helper/facebook-share-count';

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

    // show and hide post actions
    setInterval( () => {
      const scrollTop = $(window).scrollTop();
      const heightPostBody = $('.post-body').height();

      (scrollTop < heightPostBody) ? $('.postActions').addClass('is-visible') : $('.postActions').removeClass('is-visible');
    }, 250);

    /* Prism autoloader */
    Prism.plugins.autoloader.languages_path = `${$('body').attr('data-page')}/assets/scripts/prism-components/`; // eslint-disable-line
  }, // end finalize
};
