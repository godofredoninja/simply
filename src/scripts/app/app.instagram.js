// user id => 1397790551
// token => 1397790551.1aa422d.37dca7d33ba34544941e111aa03e85c7
// user nname => GodoFredoNinja
// http://instagram.com/oauth/authorize/?client_id=YOURCLIENTIDHERE&redirect_uri=HTTP://YOURREDIRECTURLHERE.COM&response_type=token

/* Template for images */
function makeImages (data) {
  const template = `
    <div class="instagram-col col s6 m4 l2">
      <a href="${data.link}" class="instagram-img u-relative u-overflowHidden u-sizeFullWidth u-block" target="_blank">
        <span class="u-absolute0 u-backgroundSizeCover u-backgroundColorGrayLight instagram-lazy lazy" data-original="${data.images.standard_resolution.url}" style:"z-index:2"></span>
        <div class="instagram-hover u-absolute0 u-flexColumn" style="z-index:3">
          <div class="u-textAlignCenter u-fontWeightBold u-textColorWhite u-fontSize20">
            <span style="padding-right:10px"><i class="i-favorite"></i> ${data.likes.count}</span>
            <span style="padding-left:10px"><i class="i-comments"></i> ${data.comments.count}</span>
          </div>
        </div>
      </a>
    </div>
  `;

  return template;
}

export default (userId, token, userName) => {
  const imageTotal = 6;
  const getUrl = `https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${token}&count=${imageTotal}&callback=?`;
  const userTemplate = `<a href="https://www.instagram.com/${userName}" class="button button--large button--chromeless" target="_blank"><i class="i-instagram"></i> ${userName}</a>`;

  $.ajax({
    url: getUrl,
    dataType: 'jsonp',
    type: 'GET',
    success: (res) => {
      res.data.map( (dataImage) => {
        const images = makeImages(dataImage);

        $('.instagram').removeClass('u-hide');
        $('.instagram-wrap').append(images);
        $('.instagram-name').html(userTemplate);
      });
    },
    complete: () => { $('.instagram-lazy.lazy').lazyload({effect : 'fadeIn'}) },
    error: () => { $('.instagram').remove() },
  });
}
