/* global prismJs */

// lib
import 'lazysizes'

import loadScript from './components/load-script'
import videoResponsive from './components/video-responsive'
import resizeImagesInGalleries from './components/resize-images-galleries'

const simplySetup = () => {
  /* All Video Responsive
  /* ---------------------------------------------------------- */
  videoResponsive()

  /* Gallery Card
  /* ---------------------------------------------------------- */
  resizeImagesInGalleries()

  /* highlight prismjs
  /* ---------------------------------------------------------- */
  if (document.querySelectorAll('code[class*=language-]').length && typeof prismJs !== 'undefined') {
    loadScript(prismJs)
  }
}

window.addEventListener('load', simplySetup)
