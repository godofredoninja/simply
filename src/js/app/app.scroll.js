import { qs } from './app.variables'

export default () => {
  const domBody = document.body
  const shareStickyFooter = qs('.share-sticky')
  const backToTop = qs('.js-back-to-top')
  const hasCover = domBody.closest('.has-cover')

  let didScroll = false
  let lastScrollY = 0
  let scrollDownUp = 0
  const delta = 5

  // Scroll Down
  // -----------------------------------------------------------------------------
  const scrollDown = st => {
    shareStickyFooter && shareStickyFooter.classList.remove('is-visible')
    // qs('.header').classList.add('is-visible')

    scrollDownUp = st
  }

  // Scroll Up
  // -----------------------------------------------------------------------------
  const scrollUp = st => {
    shareStickyFooter && shareStickyFooter.classList.add('is-visible')
    // qs('.header').classList.remove('is-visible')

    scrollDownUp = st
  }

  // Has Scrolled
  // -----------------------------------------------------------------------------
  const hasScrolled = () => {
    const st = window.scrollY

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollY - st) <= delta) return false

    // back to top show
    if (backToTop) {
      st > 300 ? backToTop.classList.add('fade') : backToTop.classList.remove('fade')
    }

    // show background and transparency
    // in header when page have cover image
    if (hasCover) {
      st >= 60 ? domBody.classList.remove('is-transparent') : domBody.classList.add('is-transparent')
    }

    // Scroll down and Scroll Up
    scrollDownUp <= st ? scrollDown(st) : scrollUp(st)

    lastScrollY = st
  }

  // Did Scroll
  // -----------------------------------------------------------------------------
  window.addEventListener('scroll', () => (didScroll = true), { passive: true })

  // Checking if it was scrolled or not in a time interval
  // -----------------------------------------------------------------------------
  setInterval(() => {
    if (didScroll) {
      hasScrolled()
      didScroll = false
    }
  }, 250)
}
