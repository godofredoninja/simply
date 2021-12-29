import mediumZoom from 'medium-zoom'

import getAll from '../app/get-all'

export default img => {
  getAll(img).forEach(el => !el.closest('a') && el.classList.add('simply-zoom'))

  mediumZoom('.simply-zoom', {
    margin: 20,
    background: 'hsla(0,0%,100%,.85)'
  })
}
