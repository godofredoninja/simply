import { qsa, urlRegexp } from './app.variables'

export default socialMedia => {
  const createElement = box => {
    Object.entries(socialMedia).forEach(([name, urlTitle]) => {
      if (typeof urlTitle[0] === 'string' && urlRegexp.test(urlTitle[0])) {
        const link = document.createElement('a')
        link.href = urlTitle[0]
        link.title = urlTitle[1]
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        link.innerHTML = `<svg class="icon icon--${name}"><use xlink:href="#icon-${name}"></use></svg>`

        box.appendChild(link)
      }
    })
  }

  qsa('.js-social-media').forEach(el => createElement(el))
}
