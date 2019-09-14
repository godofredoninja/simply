export const qs = document.querySelector.bind(document)
export const qsa = document.querySelectorAll.bind(document)

export const urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/ //eslint-disable-line

/* Iframe SRC video */
export const iframeVideo = [
  'iframe[src*="player.vimeo.com"]',
  'iframe[src*="dailymotion.com"]',
  'iframe[src*="youtube.com"]',
  'iframe[src*="youtube-nocookie.com"]',
  'iframe[src*="player.twitch.tv"]',
  'iframe[src*="kickstarter.com"][src*="video.html"]'
]
