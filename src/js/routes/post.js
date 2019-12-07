/* global instagramFeed sitePrismJs */

import mediumZoom from 'medium-zoom'

// Variables
import { qs, qsa, iframeVideo } from '../app/app.variables'
import { loadScript } from '../app/app.load-style-script'
import instagram from '../app/app.instagram'

export default {
  init () {
    // Video Responsive
    // -----------------------------------------------------------------------------
    const arrIframe = qsa(iframeVideo.join(','))
    if (arrIframe.length) {
      arrIframe.forEach(el => {
        const box = document.createElement('div')
        box.className = 'video-responsive'
        el.parentNode.insertBefore(box, el)
        box.appendChild(el)
      })
    }
  }, // End Init

  finalize () {
    // gallery
    // -----------------------------------------------------------------------------
    qsa('.kg-gallery-image > img').forEach(item => {
      const container = item.closest('.kg-gallery-image')
      const width = item.attributes.width.value
      const height = item.attributes.height.value
      const ratio = width / height
      container.style.flex = ratio + ' 1 0%'
    })

    // medium-zoom
    // -----------------------------------------------------------------------------
    qsa('.post-body img').forEach(el => !el.closest('a') && el.classList.add('simply-zoom'))

    mediumZoom('.simply-zoom', {
      margin: 20,
      background: 'hsla(0,0%,100%,.85)'
    })

    // highlight prismjs
    // -----------------------------------------------------------------------------
    if (qsa('code[class*="language-"]').length && typeof sitePrismJs !== 'undefined') {
      loadScript(sitePrismJs)
    }

    // Instagram Feed
    // -----------------------------------------------------------------------------
    const instagramBox = qs('.js-instagram')
    if (typeof instagramFeed === 'object' && instagramFeed !== null && instagramBox) {
      instagram(instagramFeed, instagramBox)
    }

    // Post Share
    // -----------------------------------------------------------------------------
    qsa('.js-share').forEach(item => item.addEventListener('click', e => {
      const width = 640
      const height = 400
      const win = window
      const doc = document

      const dualScreenLeft = win.screenLeft !== undefined ? win.screenLeft : win.screenX
      const dualScreenTop = win.screenTop !== undefined ? win.screenTop : win.screenY

      const containerWidth = win.innerWidth ? win.innerWidth : doc.documentElement.clientWidth ? doc.documentElement.clientWidth : win.screen.width
      const containerHeight = win.innerHeight ? win.innerHeight : doc.documentElement.clientHeight ? doc.documentElement.clientHeight : win.screen.height

      const left = ((containerWidth / 2) - (width / 2)) + dualScreenLeft
      const top = ((containerHeight / 2) - (height / 2)) + dualScreenTop
      const newWindow = win.open(e.currentTarget.href, 'share-window', `scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}`)

      // Puts focus on the newWindow
      win.focus && newWindow.focus()

      e.preventDefault()
    }))
  } // End Finalize
}
