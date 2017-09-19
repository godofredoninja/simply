const $videoPostFormat = $('.video-post-format');

/* Iframe SRC video */
const iframeVideo = [
  'iframe[src*="player.vimeo.com"]',
  'iframe[src*="dailymotion.com"]',
  'iframe[src*="facebook.com/plugins/video.php"]',
  'iframe[src*="youtube.com"]',
  'iframe[src*="youtube-nocookie.com"]',
  'iframe[src*="kickstarter.com"][src*="video.html"]',
];

/* Iframe src audio */
const iframeAudio = [
  'iframe[src*="w.soundcloud.com"]',
  'iframe[src*="soundcloud.com"]',
  'iframe[src*="embed.spotify.com"]',
  'iframe[src*="spotify.com"]',
];

export default () => {
  // Video large for (VIDEO POST FORMAT)
  const firstVideo = $('.post-body').find(iframeVideo.join(','))[0];
  $(firstVideo).appendTo($videoPostFormat).wrap('<aside class="video-responsive"></aside>');

  //  Variables for embed media
  const iframe = iframeAudio.concat(iframeVideo);
  const allMedia = $('.post-body').find(iframe.join(','));

  // Map ALL EMBED MEDIA
  allMedia.map((key, value) => $(value).wrap('<aside class="video-responsive"></aside>'));

  // youTube Btn Subscribe
  if (typeof youtubeChannelName !== 'undefined' && typeof youtubeChannelID !== 'undefined') {
    /*eslint-disable */
    const template = `
    <div class="video-subscribe u-flex u-marginTop20 u-h-b-md" style="margin-bottom:16px">
      <span class="channel-name" style="margin-right:16px">Subscribe to ${youtubeChannelName}</span>
      <div class="g-ytsubscribe" data-channelid="${youtubeChannelID}" data-layout="default" data-count="default"></div>
    </div>`;
    /*eslint-enable */

    $videoPostFormat.append(template);

    const go = document.createElement('script');
    go.type = 'text/javascript';
    go.async = true;
    go.src = 'https://apis.google.com/js/platform.js';
    // document.body.appendChild(go);
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(go, s);
  }
};
