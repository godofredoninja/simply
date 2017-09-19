/* Return rounded and pretty value of share count. */
const convertNumber = (n) => {
  if (n >= 1000000000) return `${(n / 1000000000).toFixed(1)}G`;
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n;
};

export default sharebox => {
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
