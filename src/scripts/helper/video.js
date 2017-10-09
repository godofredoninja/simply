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
// const iframeAudio = [
//   'iframe[src*="w.soundcloud.com"]',
//   'iframe[src*="soundcloud.com"]',
//   'iframe[src*="embed.spotify.com"]',
//   'iframe[src*="spotify.com"]',
// ];

export default () => {
  //  Variables for embed media
  // const iframe = iframeAudio.concat(iframeVideo);
  const $allMedia = $('.post-body').find(iframeVideo.join(','));

  // Map ALL EMBED MEDIA
  // allMedia.map((key, value) => $(value).wrap('<aside class="video-responsive"></aside>'));
  $allMedia.each(function () {
    const $this = $(this);

    const height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height();
    const width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width();
    const aspectRatio = height / width;

    $(this).wrap('<aside class="video-responsive"></aside>').parent('.video-responsive').css('padding-bottom', (aspectRatio * 100)+'%');
  });

  // Video Post Format
  if ($('.video-post-format').length) {
    // Video large in top af page
    const firstVideo = $('.post-body').find(iframeVideo.join(','))[0];
    $(firstVideo).parent('.video-responsive').appendTo($videoPostFormat);

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
  }
};
