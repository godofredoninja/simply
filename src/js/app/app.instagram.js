import fetchQuote from './app.fetch'

const templateInstagram = data =>
  `<div class="col s4 l2">
    <a href="${data.link}" class="instagram-img u-relative u-overflowHidden u-sizeFullWidth u-block u-bgGray" target="_blank" rel="noopener noreferrer">
      <img class="u-absolute0 u-image blur-up lazyload" src="${data.images.low_resolution.url}" alt=""/>
      <div class="instagram-hover u-absolute0 u-flexCenter u-justify-content-center u-fontWeightMedium u-textColorWhite u-fontSize20 zindex2">
        <span><svg class="icon top2"><use xlink:href="#icon-heart"></use></svg> ${data.likes.count}</span>
        <span><svg class="icon top2"><use xlink:href="#icon-comments"></use></svg> ${data.comments.count}</span>
      </div>
    </a>
  </div>`

// Shuffle Array
const shuffleArray = arr => arr
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1])

const displayInstagram = (res, user, instagramBox) => {
  const shuffle = shuffleArray(res.data)
  const sf = shuffle.slice(0, 6)

  const link = document.createElement('a')
  link.classList = 'instagram-name button button--large button--dark'
  link.href = `https://www.instagram.com/${user}`
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.innerHTML = `<svg class="icon"><use xlink:href="#icon-instagram"></use></svg> ${user}`

  const box = document.createElement('div')
  box.classList = 'row no-gutters'

  sf.map(img => {
    const images = templateInstagram(img)
    box.innerHTML += images
  })

  instagramBox.classList.remove('u-hide')
  instagramBox.appendChild(box)
  instagramBox.appendChild(link)
}

export default async (instagramFeed, instagramBox) => {
  const url = `https://api.instagram.com/v1/users/${instagramFeed.userId}/media/recent/?access_token=${instagramFeed.token}&count=10&callback=?`

  try {
    const result = await fetchQuote(url)
    displayInstagram(result, instagramFeed.userName, instagramBox)
  } catch (err) {
    instagramBox.remove()
  }
}
