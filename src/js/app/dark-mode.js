/* global localStorage  */
import getAll from './get-all'

export default el => {
  const toggleTheme = getAll(el)

  if (!toggleTheme.length) return

  const html = document.documentElement

  toggleTheme.forEach(item => item.addEventListener('click', function (event) {
    event.preventDefault()

    if (!html.classList.contains('dark')) {
      html.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      html.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }))
}
