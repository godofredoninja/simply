import facebookShareCount from '../app/app.facebook-share-count';
import simplyInstagram from '../app/app.instagram';

/* Iframe SRC video */
const iframeVideo = [
  'iframe[src*="player.vimeo.com"]',
  'iframe[src*="dailymotion.com"]',
  'iframe[src*="youtube.com"]',
  'iframe[src*="youtube-nocookie.com"]',
  'iframe[src*="vid.me"]',
  'iframe[src*="kickstarter.com"][src*="video.html"]',
];

export default {
  init() {
    const $allMedia = $('.post-body').find(iframeVideo.join(','));

    // Video responsive
    // allMedia.map((key, value) => $(value).wrap('<aside class="video-responsive"></aside>'));
    $allMedia.each(function () {
      $(this).wrap('<aside class="video-responsive"></aside>').parent('.video-responsive');
    });

    // Gallery
    const images = document.querySelectorAll('.kg-gallery-image img');

    images.forEach(function (image) {
      const container = image.closest('.kg-gallery-image');
      const width = image.attributes.width.value;
      const height = image.attributes.height.value;
      const ratio = width / height;
      container.style.flex = ratio + ' 1 0%';
    })

  },
  finalize() {
    // Add data action zoom FOR IMG
    $('.post-body').find('img').attr('data-action', 'zoom');

    // Share Count
    facebookShareCount($('.share-count'));

    // sticky share post in left
    $('.sharePost').theiaStickySidebar({additionalMarginTop: 30});

    // newsletter title change
    if (typeof newsletterTitle !== 'undefined') $('.newsletter-title').html(newsletterTitle); // eslint-disable-line

    // newsletter Description
    if (typeof newsletterDescription !== 'undefined') $('.newsletter-description').html(newsletterDescription); // eslint-disable-line

    // Instagram Feed
    if (typeof instagramUserId !== 'undefined' && typeof instagramToken !== 'undefined' && typeof instagramUserName !== 'undefined') {
      simplyInstagram(instagramUserId, instagramToken, instagramUserName); // eslint-disable-line
    }

    /* Prism autoloader */
    Prism.plugins.autoloader.languages_path = `${$('body').attr('data-page')}/assets/scripts/prism-components/`; // eslint-disable-line
  }, // end finalize
};
