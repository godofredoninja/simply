export default links => {
  const urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/; // eslint-disable-line

  return $.each(links, (name, url) => {
    if (typeof url === 'string' && urlRegexp.test(url)) {
      const template = `
      <a
        href="${url}"
        title="Follow me in ${name}"
        target="_blank"
        class="godo-tracking i-${name}"
        data-event-category="Social"
        data-event-action="Social"
        data-event-label="${name}"
        data-event-non-interaction="true">
      </a>`;

      $('.followMe').append(template);
    }
  });
};
