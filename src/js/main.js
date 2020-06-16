// lib
import 'lazysizes'

import videoResponsive from './components/video-responsive'
import resizeImagesInGalleries from './components/resize-images-galleries'

const simplySetup = () => {
  /* All Video Responsive
  /* ---------------------------------------------------------- */
  videoResponsive()

  /* Gallery Card
  /* ---------------------------------------------------------- */
  resizeImagesInGalleries()
}

window.addEventListener('load', simplySetup)
