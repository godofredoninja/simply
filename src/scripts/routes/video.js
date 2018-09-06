// const $postBody = $('.post-body');
const $videoEmbed = $('.video-post-format');

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
    const firstVideo = $('.post-body').find(iframeVideo.join(','))[0];

    if (typeof firstVideo === 'undefined') {
      return;
    }

    $videoEmbed.removeClass('u-hide');
    const $video = $(firstVideo);
    const $firstParentVideo = $video.parent('.video-responsive');
    const $secondParentVideo = $firstParentVideo.parent('.kg-embed-card');

    // Append Video
    if ($secondParentVideo.hasClass('kg-embed-card')) {
      $secondParentVideo.appendTo($videoEmbed);
    } else {
      $firstParentVideo.appendTo($videoEmbed);
    }

     // youTube Btn Subscribe
     if (typeof youtubeChannelName !== 'undefined' && typeof youtubeChannelID !== 'undefined') {
      /*eslint-disable */
      const template = `
      <div class="video-subscribe u-flex u-marginTop20 u-h-b-md" style="margin-bottom:16px">
        <span class="channel-name" style="margin-right:16px">Subscribe to ${youtubeChannelName}</span>
        <div class="g-ytsubscribe" data-channelid="${youtubeChannelID}" data-layout="default" data-count="default"></div>
      </div>`;
      /*eslint-enable */

      $videoEmbed.append(template);

      const go = document.createElement('script');
      go.type = 'text/javascript';
      go.async = true;
      go.src = 'https://apis.google.com/js/platform.js';
      // document.body.appendChild(go);
      const s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(go, s);
    }
  },
}
