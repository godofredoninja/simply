export default (src, callback) => {
  const scriptElement = document.createElement('script')
  scriptElement.src = src
  scriptElement.defer = true
  scriptElement.async = true

  callback && scriptElement.addEventListener('load', callback)
  document.body.appendChild(scriptElement)
}
