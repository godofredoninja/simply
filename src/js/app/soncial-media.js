// import { urlRegexp } from './app.variables'
import urlRegexp from '../components/url-regular-expression'
import getAll from './get-all'

export default (socialMediaData, boxSelector) => {
  // check if the box for the menu exists
  const nodeBox = getAll(boxSelector)

  if (!nodeBox.length) return

  const createElement = element => {
    Object.entries(socialMediaData).forEach(([name, urlTitle]) => {
      const url = urlTitle[0]

      // The url is being validated if it is false it returns
      if (!urlRegexp(url)) return

      const link = document.createElement('a')
      link.href = url
      link.title = urlTitle[1]
      link.classList = `hover:text-${name} p-2 inline-block`
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.innerHTML = `<svg class="icon icon--${name}"><use xlink:href="#icon-${name}"></use></svg>`

      element.appendChild(link)
    })
  }

  return nodeBox.forEach(createElement)
}
