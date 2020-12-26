export default (coverClass, headTransparent) => {
  const domBody = document.body
  const hasCover = domBody.closest(coverClass)

  if (!hasCover) return

  window.addEventListener('scroll', () => {
    const lastScrollY = window.scrollY

    lastScrollY >= 60 ? domBody.classList.remove(headTransparent) : domBody.classList.add(headTransparent)
  }, { passive: true })
}
