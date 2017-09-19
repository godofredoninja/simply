export default links => {
  const urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/; // eslint-disable-line

  return $.each(links, (name, url) => {
    if (typeof url === 'string' && urlRegexp.test(url)) {
      const template = `
      <a
        href="${url}"
        title="Follow me in ${name}"
        target="_blank"
        class="simply-tracking i-${name}"
        data-event-category="FollowMe"
        data-event-action="Social"
        data-event-label="${name}"
        data-event-non-interaction="1">
      </a>`;

      $('.followMe').append(template);
    }
  });
};
