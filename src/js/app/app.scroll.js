import { qs, qsa } from './app.variables'

export default () => {
  const body = document.body
  const postAction = qs('.pa')
  const postShareSidebar = qs('.post-sticky .sticky')
  const intersectSels = ['.kg-width-full', '.kg-width-wide']
  const backToTop = qs('.js-back-to-top')

  let didScroll = false
  let lastScrollY = 0
  let scrollDownUP = 0
  const delta = 5

  const observe = [].slice.call(qsa(intersectSels.join(',')))
  const hasIntersectSels = observe.length ? true : false // eslint-disable-line

  // Intersect share and image
  // -----------------------------------------------------------------------------
  const intersects = (el1, el2) => {
    const rect1 = el1.getBoundingClientRect()
    const rect2 = el2.getBoundingClientRect()

    return !(rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.bottom < rect2.top || rect1.left > rect2.right)
  }

  // the floating fade sharing in the sidebar
  // -----------------------------------------------------------------------------
  const shareSidebarFade = () => {
    const ele = postShareSidebar
    let isHidden = false

    for (const i in observe) {
      if (intersects(ele, observe[i])) {
        isHidden = true
        break
      }
    }

    isHidden ? postShareSidebar.classList.add('is-hidden') : postShareSidebar.classList.remove('is-hidden')
  }

  // Scroll Down
  // -----------------------------------------------------------------------------
  const scrollDown = scrollY => {
    postAction && postAction.classList.remove('is-visible')

    scrollDownUP = scrollY
  }

  // Scroll Up
  // -----------------------------------------------------------------------------
  const scrollUp = scrollY => {
    postAction && postAction.classList.add('is-visible')

    scrollDownUP = scrollY
  }

  // Has Scrolled
  // -----------------------------------------------------------------------------
  const hasScrolled = () => {
    const scrollY = window.scrollY

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollY - scrollY) <= delta) return false

    // back to top show
    scrollY > 200 ? backToTop.classList.add('fade') : backToTop.classList.remove('fade')

    // show background and transparency
    // in header when page have cover image
    if (body.closest('.has-cover')) {
      scrollY >= 60 ? body.classList.remove('is-transparent') : body.classList.add('is-transparent')
    }

    // Scroll down and Scroll Up
    scrollDownUP <= scrollY ? scrollDown(scrollY) : scrollUp(scrollY)

    // Share Fade when Intersect with image large
    hasIntersectSels && shareSidebarFade()

    lastScrollY = scrollY
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
