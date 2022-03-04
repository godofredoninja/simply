// https://www.javascripttutorial.net/javascript-dom/javascript-scroll-events/

export default (coverClass, headTransparent) => {
  const domBody = document.body
  const hasCover = domBody.closest(coverClass)
  const $jsHeader = document.querySelector('.js-header')

  window.addEventListener('scroll', () => {
    const lastScrollY = window.scrollY

    if (lastScrollY > 5) {
      $jsHeader.classList.add('shadow-header', 'header-bg')
    } else {
      $jsHeader.classList.remove('shadow-header', 'header-bg')
    }

    if (!hasCover) return

    lastScrollY >= 20 ? domBody.classList.remove(headTransparent) : domBody.classList.add(headTransparent)
  }, { passive: true })
}

// const scrollFunction = () => {
//   if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
//     $jsHeader.classList.add('shadow-header', 'header-bg')
//   } else {
//     $jsHeader.classList.remove('shadow-header', 'header-bg')
//   }
// }

// window.onscroll = function () {
//   scrollFunction()
// }
