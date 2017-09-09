/**
 * @package GodoFredoNinja
 * JavaScript modules for helper
 */

/* Iframe SRC video */
const iframeForVideoResponsive = [
  'iframe[src*="player.vimeo.com"]',
  'iframe[src*="dailymotion.com"]',
  'iframe[src*="facebook.com/plugins/video.php"]',
  'iframe[src*="youtube.com"]',
  'iframe[src*="youtube-nocookie.com"]',
  'iframe[src*="kickstarter.com"][src*="video.html"]',
];

/* Iframe src audio */
const iframeForAudioResponsive = [
  'iframe[src*="w.soundcloud.com"]',
  'iframe[src*="soundcloud.com"]',
  'iframe[src*="embed.spotify.com"]',
  'iframe[src*="spotify.com"]',
];

/* Return rounded and pretty value of share count. */
const convertNumber = (n) => {
  if (n >= 1000000000) return `${(n / 1000000000).toFixed(1)}G`;
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n;
};

/* search all video in <post-body>  for Responsive*/
function simplyVideoResponsive(elem) {
  const iframe = iframeForAudioResponsive.concat(iframeForVideoResponsive);
  const allVideos = elem.find(iframe.join(','));

  return allVideos.map((key, value) => $(value).wrap('<aside class="video-responsive"></aside>'));
}

/* Facebook Share Counts */
function simplyFacebookShareCount(sharebox) {
  sharebox.each( function () {
    const $this = $(this);
    const url = $this.attr('data-url');
    const getURL = `https://graph.facebook.com/?id=${encodeURIComponent(url)}&callback=?`;

    $.getJSON(getURL, (res) => {
      if (res.share !== undefined) {
        const n = res.share.share_count;
        const count = convertNumber(n);
        $this.html(count);
      }
    });
  });
}

/* Follow me in my social media*/
function simplyFollowMe(links, box, urlRegexp) {
  return $.each(links, (name, url) => {
    if (typeof url === 'string' && urlRegexp.test(url)) {
      const template = `<a data-event-category="FollowMe" data-event-action="Social" data-event-label="${name}" data-event-non-interaction="1" title="Follow me in ${name}" href="${url}" target="_blank" class="simply-tracking i-${name} c-${name}"></a>`;
      box.append(template);
    }
  });
}

/* Video Post Format */
function simplyVideoPostFormat (videoPostFormatBox) {
  const firstVideo = $('.post-body').find(iframeForVideoResponsive.join(','))[0];
  $(firstVideo).appendTo(videoPostFormatBox).wrap('<aside class="video-responsive"></aside>');
}

module.exports = {
  videoResponsive: simplyVideoResponsive,
  facebookShareCount: simplyFacebookShareCount,
  followMe: simplyFollowMe,
  videoPostFormat: simplyVideoPostFormat,
};
