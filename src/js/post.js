/* global prismJs */

import './main'

import mediumZoom from 'medium-zoom'

import loadScript from './util/load-script'
import docSelectorAll from './util/document-query-selector-all'

const simplyPost = () => {
  /* All Video Responsive
  /* ---------------------------------------------------------- */
  const videoResponsive = () => {
    const selectors = [
      'iframe[src*="player.vimeo.com"]',
      'iframe[src*="dailymotion.com"]',
      'iframe[src*="youtube.com"]',
      'iframe[src*="youtube-nocookie.com"]',
      'iframe[src*="player.twitch.tv"]',
      'iframe[src*="kickstarter.com"][src*="video.html"]'
    ]

    const $iframes = docSelectorAll(selectors.join(','))

    if (!$iframes.length) return

    $iframes.forEach(el => {
      el.classList.add('aspect-video', 'w-full')
      // const parentForVideo = document.createElement('div')
      // parentForVideo.className = 'video-responsive'
      // el.parentNode.insertBefore(parentForVideo, el)
      // parentForVideo.appendChild(el)
      el.removeAttribute('height')
      el.removeAttribute('width')
    })
  }

  videoResponsive()

  /* medium-zoom
  /* ---------------------------------------------------------- */
  const mediumZoomImg = () => {
    docSelectorAll('.post-body img').forEach(el => !el.closest('a') && el.classList.add('simply-zoom'))

    mediumZoom('.simply-zoom', {
      margin: 20,
      background: 'hsla(0,0%,100%,.85)'
    })
  }

  mediumZoomImg()

  /* Copy Link
  /* https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText#examples
  /* ---------------------------------------------------------- */

  const copyLink = () => {
    const $links = docSelectorAll('.js-copy-link')

    if (!$links.length) return

    $links.forEach(item => item.addEventListener('click', function (event) {
      event.preventDefault()

      const shortLinkIndicator = item.querySelector('.shortlink-indicator')

      navigator.clipboard.writeText(item.href).then(() => {
        shortLinkIndicator.classList.remove('hidden')
      })

      setTimeout(() => shortLinkIndicator.classList.add('hidden'), 4000)
    }))
  }

  copyLink()

  /* Gallery Card
  /* ---------------------------------------------------------- */
  // const resizeImagesInGalleries = () => {
  //   const $galleryImg = docSelectorAll('.kg-gallery-image > img')

  //   if (!$galleryImg.length) return

  //   $galleryImg.forEach(image => {
  //     const container = image.closest('.kg-gallery-image')
  //     const width = image.attributes.width.value
  //     const height = image.attributes.height.value
  //     const ratio = width / height
  //     container.style.flex = ratio + ' 1 0%'
  //   })
  // }

  // resizeImagesInGalleries()

  /* highlight prismjs
  /* ---------------------------------------------------------- */
  if (docSelectorAll('code[class*=language-]').length && typeof prismJs !== 'undefined') {
    loadScript(prismJs)
  }
}

document.addEventListener('DOMContentLoaded', simplyPost)
