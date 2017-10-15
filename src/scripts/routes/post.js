import facebookShareCount from '../app/app.facebook-share-count';
import simplyInstagram from '../app/app.instagram';

/* Iframe SRC video */
const iframeVideo = [
  'iframe[src*="player.vimeo.com"]',
  'iframe[src*="dailymotion.com"]',
  'iframe[src*="facebook.com/plugins/video.php"]',
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
      const $this = $(this);

      const height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height();
      const width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width();
      const aspectRatio = height / width;

      $(this).wrap('<aside class="video-responsive"></aside>').parent('.video-responsive').css('padding-bottom', (aspectRatio * 100)+'%');
    });
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
