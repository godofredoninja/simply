/* global searchSettings followSocialMedia siteSearch localStorage */

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

    // Active Dark Mode
    // -----------------------------------------------------------------------------
    const jsDarkMode = qs('.js-dark-mode')
    if (jsDarkMode) {
      jsDarkMode.addEventListener('click', el => {
        el.preventDefault()

        const dd = document.documentElement
        const dataTheme = dd.getAttribute('data-theme')

        if (dataTheme === 'light') {
          dd.setAttribute('data-theme', 'dark')
          localStorage.setItem('selected-theme', 'dark')
        } else {
          dd.setAttribute('data-theme', 'light')
          localStorage.setItem('selected-theme', 'light')
        }
      })
    }

    //  Scroll to a certain element for ID
    // -----------------------------------------------------------------------------
    // qsa('.js-scroll-id').forEach(item => item.addEventListener('click', function (e) {
    //   e.preventDefault()
    //   const destiny = qs(this.getAttribute('href'))

    //   destiny.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'nearest',
    //     inline: 'nearest'
    //   })
    // }))

    //  Toggle modal subscribe
    // -----------------------------------------------------------------------------
    qsa('.js-m-subscribe-toggle').forEach(item => item.addEventListener('click', function (e) {
      e.preventDefault()

      qs('.m-subscribe').classList.toggle('active')
    }))

    // Scroll Back to top animate
    // -----------------------------------------------------------------------------
    const backToTop = qs('.js-back-to-top')

    if (backToTop) {
      backToTop.addEventListener('click', function (e) {
        e.preventDefault()

        if (window) {
          try {
            // The New API.
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth'
            })
          } catch (error) {
            // For older browsers.
            window.scrollTo(0, 0)
          }
        }
      })
    }

    // Load Search
    // -----------------------------------------------------------------------------
    if (typeof searchSettings !== 'undefined' && typeof siteSearch !== 'undefined') {
      loadScript('https://unpkg.com/@tryghost/content-api@1.3.4/umd/content-api.min.js', () => {
        loadScript(siteSearch)
      })
    }

    // Scroll
    // -----------------------------------------------------------------------------
    myScroll()
  } // JavaScript to be fired on all pages, after page specific JS is fired
}
