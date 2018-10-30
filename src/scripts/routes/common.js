import simplyLazyLoadImage from '../app/app.lazy-load'
import simplyFollow from '../app/app.follow';
import simplyGhostSearch from '../app/app.search';

export default {
  init() {
    // Follow me
    if (typeof followSocialMedia !== 'undefined') { simplyFollow(followSocialMedia) } // eslint-disable-line

    /* Lazy load for image */
    simplyLazyLoadImage();
  }, // end Init

  finalize() {
    /* sicky sidebar */
    $('.sidebar-sticky').theiaStickySidebar({
      additionalMarginTop: 80,
      additionalMarginBottom: 10,
      minWidth: 970,
    });

    // Search
    simplyGhostSearch();

    /* Prism autoloader */
    Prism.plugins.autoloader.languages_path = `${$('body').attr('data-page')}/assets/scripts/components/`; // eslint-disable-line
  }, //end => Finalize
};
