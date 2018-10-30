import facebookShareCount from '../app/app.facebook-share-count';
import simplyInstagram from '../app/app.instagram';
// import shareFade from '../app/app.share-fade'

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
    $('.post-body img').not('.kg-width-full img').attr('data-action', 'zoom');
    $('.post-body').find('a').find('img').removeAttr('data-action');

    // Share Count
    facebookShareCount($('.share-count'));

    // sticky share post in left
    $('.sharePost').theiaStickySidebar({
      additionalMarginTop: 80,
      minWidth: 970,
    });

    // Instagram Feed
    if (typeof instagramUserId !== 'undefined' && typeof instagramToken !== 'undefined' && typeof instagramUserName !== 'undefined') {
      const url = `https://api.instagram.com/v1/users/${instagramUserId}/media/recent/?access_token=${instagramToken}&count=10&callback=?`; // eslint-disable-line
      const user = `<a href="https://www.instagram.com/${instagramUserName}" class="instagram-btn" target="_blank"><i class="i-instagram"></i> ${instagramUserName}</a>`; // eslint-disable-line

      simplyInstagram(url, user);
    }

    // Share Fade
    // shareFade($('.sr-wrap'));
  },
};
