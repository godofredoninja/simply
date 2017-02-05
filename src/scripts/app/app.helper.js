/**
 * @package GodoFredoNinja
 * JavaScript modules for helper
 */

/* Return rounded and pretty value of share count. */
// const convertNumber = (n) => {
//   if (n >= 1000000000) return `${(n / 1000000000).toFixed(1)}G`;
//   if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
//   if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
//   return n;
// };

/* search all video in <post-body>  for Responsive*/
function simplyVideoResponsive(elem) {
  return elem.each(function () {
    const selectors = [
      'iframe[src*="player.vimeo.com"]',
      'iframe[src*="w.soundcloud.com"]',
      'iframe[src*="soundcloud.com"]',
      'iframe[src*="embed.spotify.com"]',
      'iframe[src*="spotify.com"]',
      'iframe[src*="youtube.com"]',
      'iframe[src*="youtube-nocookie.com"]',
      'iframe[src*="kickstarter.com"][src*="video.html"]',
    ];

    const $allVideos = $(this).find(selectors.join(','));

    $allVideos.each(function () {
      $(this).wrap('<aside class="video-responsive"></aside>');
    });
  });
}

/* Facebook Comments Counts */
// function simplyFacebookShareCount(sharebox) {
//   sharebox.each(() => {
//     const url = sharebox.attr('data-url');
//     const getURL = `https://graph.facebook.com/?id=${encodeURIComponent(url)}&callback=?`;

//     $.getJSON(getURL, (res) => {
//       if (res.share !== undefined) {
//         const n = res.share.share_count;
//         const count = convertNumber(n);
//         sharebox.html(count);
//       }
//     });
//   });
// }


module.exports = {
  videoResponsive: simplyVideoResponsive,
  // facebookShareCount: simplyFacebookShareCount,
};
