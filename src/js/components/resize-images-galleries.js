import getAll from '../app/get-all'

/**
 * Gallery card support
 * Used on any individual post/page
 *
 * Detects when a gallery card has been used and applies sizing to make sure
 * the display matches what is seen in the editor.
 */

export default () => {
  const images = getAll('.kg-gallery-image > img')

  if (!images.length) return

  images.forEach(image => {
    const container = image.closest('.kg-gallery-image')
    const width = image.attributes.width.value
    const height = image.attributes.height.value
    const ratio = width / height
    container.style.flex = ratio + ' 1 0%'
  })
}
