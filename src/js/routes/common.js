/* global searchSettings followSocialMedia siteSearch */

import { qs, qsa } from '../app/app.variables'
import { loadScript } from '../app/app.load-style-script'
import socialMedia from '../app/app.soncial-media'
import myScroll from '../app/app.scroll'

export default {
  init () {
    // Social Media
    // -----------------------------------------------------------------------------
    if (typeof followSocialMedia === 'object' && followSocialMedia !== null) {
      socialMedia(followSocialMedia)
    }
  }, // End Init

  finalize () {
    // Toggle Menu
    // -----------------------------------------------------------------------------
    qs('.js-menu-toggle').addEventListener('click', e => {
      e.preventDefault()
      document.body.classList.toggle('has-menu')
    })

    //  Scroll to a certain element for ID
    // -----------------------------------------------------------------------------
    qsa('.js-scroll-id').forEach(item => item.addEventListener('click', function (e) {
      e.preventDefault()
      const destiny = qs(this.getAttribute('href'))

      destiny.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      })
    }))

    // Scroll Back to top animate
    // -----------------------------------------------------------------------------
    qs('.js-back-to-top').addEventListener('click', e => {
      e.preventDefault()

      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })

      // document.body.scrollIntoView({ behavior: 'smooth' })
    })

    // Load Search
    // -----------------------------------------------------------------------------
    if (typeof searchSettings !== 'undefined' && typeof siteSearch !== 'undefined') {
      loadScript('https://unpkg.com/@tryghost/content-api@1.2.8/umd/content-api.min.js', () => {
        loadScript(siteSearch)
      })
    }

    // Scroll
    // -----------------------------------------------------------------------------
    myScroll()
  } // JavaScript to be fired on all pages, after page specific JS is fired
}
