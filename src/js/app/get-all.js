export default function (selector) {
  const parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document

  return Array.prototype.slice.call(parent.querySelectorAll(selector), 0)
}
