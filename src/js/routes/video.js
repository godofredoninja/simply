/* global youTube */
import { qs, iframeVideo } from '../app/app.variables'
import { loadScript } from '../app/app.load-style-script'

export default {
  init () {
    const videoMedia = qs('.video-post-format')
    const firstVideo = qs('.post-body').querySelectorAll(iframeVideo.join(','))[0]

    if (!firstVideo) return

    // Remove class Hide
    videoMedia.classList.remove('u-hide')

    // Append Video in home of article
    if (firstVideo.closest('.kg-embed-card')) {
      videoMedia.appendChild(firstVideo.closest('.kg-embed-card'))
    } else {
      videoMedia.appendChild(firstVideo.parentNode)
    }

    // youTube Btn Subscribe
    if (typeof youTube !== 'object' && youTube === null) return

    const template = `
      <span class="channel-name" style="margin-right:16px">Subscribe to ${youTube.name}</span>
      <div class="g-ytsubscribe" data-channelid="${youTube.channelId}" data-layout="default" data-count="default"></div>
    `

    const boxChanelName = document.createElement('div')
    boxChanelName.className = 'video-subscribe u-flex u-marginTop20 u-h-b-md'
    boxChanelName.innerHTML = template
    videoMedia.appendChild(boxChanelName)

    loadScript('https://apis.google.com/js/platform.js')
  }
}
