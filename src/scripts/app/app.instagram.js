// user id => 1397790551
// token => 1397790551.1aa422d.37dca7d33ba34544941e111aa03e85c7
// user nname => GodoFredoNinja
// http://instagram.com/oauth/authorize/?client_id=YOURCLIENTIDHERE&redirect_uri=HTTP://YOURREDIRECTURLHERE.COM&response_type=token

import simplyLazyLoadImage from './app.lazy-load';

/* Template for images */
const templateInstagram = data => {
  return `<div class="instagram-col col s6 m4 l2">
  <a href="${data.link}" class="instagram-img u-relative u-overflowHidden u-sizeFullWidth u-block" target="_blank">
    <span class="u-absolute0 u-bgCover u-bgColorGrayLight simply-lazy" data-src="${data.images.standard_resolution.url}" style:"z-index:2"></span>
    <div class="instagram-hover u-absolute0 u-flexColumn" style="z-index:3">
      <div class="u-textAlignCenter u-fontWeightBold u-textColorWhite u-fontSize20">
        <span style="padding-right:10px"><i class="i-favorite"></i> ${data.likes.count}</span>
        <span style="padding-left:10px"><i class="i-comments"></i> ${data.comments.count}</span>
      </div>
    </div>
  </a>
</div>`
}

// Shuffle Array
const shuffleInstagram = arr => arr
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1]);

// Display Instagram Images
const displayInstagram = (res, user) => {
  const shuffle = shuffleInstagram(res.data);
  const sf = shuffle.slice(0, 6);

  return sf.map(img => {
    const images = templateInstagram(img);
    $('.instagram').removeClass('u-hide');
    $('.instagram-wrap').append(images);
    $('.instagram-name').html(user);
  });
}

export default (url, user) => {
  // $.get(url).done(function (data){
  //   console.log('posts', data.data);
  // }).fail(function (err){
  //   console.log(err);
  // });

  fetch(url)
  .then(response => response.json())
  .then(resource => displayInstagram(resource, user))
  .then(() => simplyLazyLoadImage().update())
  .catch( () => $('.instagram').remove());
}
