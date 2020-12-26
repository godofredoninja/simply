import getAll from '../app/get-all'

export default () => {
  /* Iframe SRC video */
  const selectors = [
    'iframe[src*="player.vimeo.com"]',
    'iframe[src*="dailymotion.com"]',
    'iframe[src*="youtube.com"]',
    'iframe[src*="youtube-nocookie.com"]',
    'iframe[src*="player.twitch.tv"]',
    'iframe[src*="kickstarter.com"][src*="video.html"]'
  ]

  const iframes = getAll(selectors.join(','))

  if (!iframes.length) return

  iframes.forEach(el => {
    const parentForVideo = document.createElement('div')
    parentForVideo.className = 'video-responsive'
    el.parentNode.insertBefore(parentForVideo, el)
    parentForVideo.appendChild(el)
    el.removeAttribute('height')
    el.removeAttribute('width')
  })
}
