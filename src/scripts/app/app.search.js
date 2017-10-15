export default ($input, blogUrl) => {
  /* Toggle card for search Search */
  $('.search-toggle').on('click', (e) => {
    e.preventDefault();
    $('body').toggleClass('is-search');
    $input.focus();
  });

  /* Search Template */
  const searchTemplate = `
  <a class="u-block" href="${blogUrl}{{link}}">
    <span class="u-contentTitle u-fontSizeBase">{{title}}</span>
    <span class="u-block u-fontSizeSmaller u-textColorNormal u-paddingTop5">{{pubDate}}</span>
  </a>`;

  // Search
  $input.ghostHunter({
    results: '#searchResults',
    zeroResultsInfo: true,
    info_template: '<p class="u-paddingBottom20 u-fontSize15">Showing {{amount}} results</p>',
    result_template: searchTemplate,
    onKeyUp: true,
  });
};
