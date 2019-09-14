import fetchQuote from '../app/app.fetch'
import { qs } from '../app/app.variables'

/* Template for images */
const templateInstagram = data => `
  <div class="col s3 m4 l2">
    <a href="${data.link}" class="instagram-img u-relative u-overflowHidden u-sizeFullWidth u-block" target="_blank" rel="noopener noreferrer">
      <img class="u-absolute u-image u-block lazyload" data-src="${data.images.standard_resolution.url}"/>
      <div class="instagram-hover u-absolute0 u-flexColumn zindex3">
        <div class="u-textAlignCenter u-fontWeightBold u-textColorWhite u-fontSize20">
          <span><svg class="icon"><use xlink:href="#icon-favorite"></use></svg> ${data.likes.count}</span>
          <span><svg class="icon"><use xlink:href="#icon-comments"></use></svg> ${data.comments.count}</span>
        </div>
      </div>
    </a>
  </div>
`

// Shuffle Array
const shuffleInstagram = arr => arr
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1])

// Display Instagram Images
const displayInstagram = (res, user) => {
  const shuffle = shuffleInstagram(res.data)
  const sf = shuffle.slice(0, 6)

  const box = qs('.instagram-wrap')
  qs('.instagram').classList.remove('u-hide')
  // append name user
  qs('.instagram-name').innerHTML = user

  sf.map(img => {
    const images = templateInstagram(img)
    box.innerHTML += images
  })
}

export default async instagramFeed => {
  const url = `https://api.instagram.com/v1/users/${instagramFeed.userId}/media/recent/?access_token=${instagramFeed.token}&count=10&callback=?`
  const user = `<a href="https://www.instagram.com/${instagramFeed.userName}" class="instagram-btn button button--large" target="_blank" rel="noopener noreferrer"><svg class="icon icon--md"><use xlink:href="#icon-instagram"></use></svg> ${instagramFeed.userName}</a>`

  try {
    const result = await fetchQuote(url)
    displayInstagram(result, user)
  } catch (err) {
    qs('.instagram').remove()
  }
}
